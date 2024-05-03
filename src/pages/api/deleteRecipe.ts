import { firestore } from "@/firebase/firebasedb";
import { FavoriteRecipe } from "@/redux/features/favoriteRecipeSlice";
import { Menu } from "@/redux/store";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

const deleteRecipe = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, id, recipe } = req.body;

    try {
        const userDocRef = doc(firestore, 'users', email);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const favoriteRecipes = userDocSnap.data().FavoriteRecipe;
            const targetFolderIndex = favoriteRecipes.findIndex((folder: FavoriteRecipe) => folder.folderId === id);

            let updatedRecipes;
            if (targetFolderIndex >= 0) {
                // 인자가 일련번호만 가지고 있는 배열인 경우(여러 레시피를 동시에 삭제)
                if (Array.isArray(recipe)) {
                    updatedRecipes = favoriteRecipes[targetFolderIndex].recipes.filter((item: Menu) =>
                        !recipe.includes(item.RCP_SEQ)
                    );
                }
                // 인자가 Menu 형태의 한 레시피인 경우(하나의 레시피만 삭제) 
                else {
                    updatedRecipes = favoriteRecipes[targetFolderIndex].recipes.filter((item: Menu) =>
                        item.RCP_SEQ !== recipe.RCP_SEQ
                    );
                }

                favoriteRecipes[targetFolderIndex].recipes = updatedRecipes;

                await updateDoc(userDocRef, {
                    FavoriteRecipe: favoriteRecipes,
                });
            }
            return res.status(200).json({ success: "레시피 삭제 완료" })
        }
        else {
            return res.status(404).json({ error: "사용자 존재 X" })
        }
    } catch (error) {
        console.error("레시피 삭제 실패: ", error);
        return res.status(500).json({ error: "레시피 삭제 실패" });
    }
}

export default deleteRecipe;