import { firestore } from "@/firebase/firebasedb";
import { FavoriteRecipe } from "@/redux/features/favoriteRecipeSlice";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next/types";

// 폴더 삭제
const deleteFolder = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, folderIds } = req.body;

    try {
        console.log("아딩: ", folderIds);
        const userDocRef = doc(firestore, 'users', email);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const favoriteRecipes: FavoriteRecipe[] = userDocSnap.data().FavoriteRecipe;

            // ID가 일치하지 않는 폴더를 찾아서 변수에 할당, 즉 ID가 일치하는 폴더들을 삭제
            const resultFolders = favoriteRecipes.filter(item => !folderIds.includes(item.folderId));

            await updateDoc(userDocRef, {
                FavoriteRecipe: resultFolders,
            });

            return res.status(200).json({ success: "폴더 삭제 완료" });
        }
    } catch (error) {
        console.error("폴더 삭제 실패: ", error);
        return res.status(500).json({ error: "폴더 삭제 실패" });
    }
}

export default deleteFolder;