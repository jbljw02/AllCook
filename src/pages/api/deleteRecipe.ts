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
            console.log("타겟 : ", targetFolderIndex);
            if (targetFolderIndex >= 0) {
                
                // 일련번호가 일치하는 레시피만 걸러냄
                const updatedRecipes = favoriteRecipes[targetFolderIndex].recipes.filter((item: Menu) => item.RCP_SEQ !== recipe.RCP_SEQ);
                console.log("원본 : ", favoriteRecipes[targetFolderIndex].recipes);
                console.log("upd: ", updatedRecipes);
                favoriteRecipes[targetFolderIndex].recipes = updatedRecipes;
                await updateDoc(userDocRef, {
                    FavoriteRecipe: favoriteRecipes,
                })
            }
            return res.status(200).json({success: "레시피 삭제 완료"})
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