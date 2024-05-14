import { firestore } from "@/firebase/firebasedb";
import { FavoriteRecipe } from "@/redux/features/favoriteRecipeSlice";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

// 폴더명을 업데이트
const updateFolderName = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, folderId, newFolderName } = req.body;

    try {
        const userDocRef = doc(firestore, 'users', email);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            const favoriteRecipe = userData.FavoriteRecipe;

            // 인자로 받은 폴더 ID와 일치하는 요소의 인덱스를 찾음
            const folderIndex = favoriteRecipe.findIndex((item: FavoriteRecipe) => item.folderId === folderId);

            // 해당 요소의 폴더명을 변경
            favoriteRecipe[folderIndex].folderName = newFolderName;

            // 변경이 완료된 관심 레시피 폴더로 DB를 업데이트
            await updateDoc(userDocRef, {
                FavoriteRecipe: favoriteRecipe,
            });

            return res.status(200).json({ newFolderName: newFolderName });
        }
    } catch (error) {
        console.error("폴더명 변경 실패: ", error);
        return res.status(500).json({ error: "폴더명 변경 실패" });
    }
}

export default updateFolderName;

