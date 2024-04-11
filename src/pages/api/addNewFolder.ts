import { firestore } from "@/firebase/firebasedb";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

// 새로운 폴더를 추가
const addNewFolder = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, folderId, folderName, recipes } = req.body;

    try {
        const userDocRef = doc(firestore, 'users', email);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            let favoriteRecipes = userData.FavoriteRecipe;

            // 새로운 폴더를 favoriteRecipes 변수에 추가
            const newFolder = {
                folderId,
                folderName,
                recipes,
            }
            favoriteRecipes.push(newFolder);

            // 요소가 추가된 배열을 DB에 업데이트
            // '이미 존재하는 문서'에 데이터를 업데이트
            await updateDoc(userDocRef, {
                FavoriteRecipe: favoriteRecipes,
            });

            res.status(200).json({ success: "폴더 추가 성공" });
        }
    } catch (error) {
        console.error("폴더 추가 실패: ", error);
        res.status(500).json({error: "폴더 추가 실패"});
    }
}

export default addNewFolder;