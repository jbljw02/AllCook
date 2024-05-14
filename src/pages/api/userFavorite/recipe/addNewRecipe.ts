import { firestore } from "@/firebase/firebasedb";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { FavoriteRecipe } from "@/redux/features/favoriteRecipeSlice";

// 새로운 관심 레시피를 추가
const addNewRecipe = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, id, recipe } = req.body;

    try {
        const userDocRef = doc(firestore, 'users', email);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const favoriteRecipes = userDocSnap.data().FavoriteRecipe;
            const targetFolderIndex = favoriteRecipes.findIndex((folder: FavoriteRecipe) => folder.folderId === id);

            if (targetFolderIndex >= 0) {
                // 새로운 레시피를 추가한 변수
                const updatedRecipes = [...favoriteRecipes[targetFolderIndex].recipes, recipe];

                // 원본 배열을 복사하고, recipes를 새로운 레시피가 추가된 변수로 업데이트
                let updatedFavoriteRecipes = [...favoriteRecipes];
                updatedFavoriteRecipes[targetFolderIndex].recipes = updatedRecipes;

                await updateDoc(userDocRef, {
                    FavoriteRecipe: updatedFavoriteRecipes,
                });

                return res.status(200).json({ success: "레시피 추가 성공" });
            }
            else {
                return res.status(500).json({ error: "폴더 ID 비정상" });
            }
        }
        else {
            return res.status(404).json({ error: "사용자 존재 X" })
        }
    } catch (error) {
        return res.status(500).json({ error: "레시피 추가 실패" });
    }
}

export default addNewRecipe;