import { firestore } from "@/firebase/firebasedb";
import { doc, getDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

// 사용자의 관심 레시피를 DB로부터 받아옴
export const reciveFavRecipes = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email } = req.body;

    try {
        const favoriteRecipeRef = doc(firestore, 'users', email);
        const favoriteRecipeSnap = await getDoc(favoriteRecipeRef);

        // 관심 레시피가 존재하는지 확인
        if (favoriteRecipeSnap.exists()) {
            const favoriteRecipe = favoriteRecipeSnap.data()?.FavoriteRecipe;
            return res.status(200).json({ favoriteRecipe: favoriteRecipe })
        }
        else {
            return res.status(500).json({ error: "관심 레시피 존재 X" })
        }
    } catch (error) {
        return res.status(500).json({ error: "관심 레시피 가져오기 실패" })
    }
}

export default reciveFavRecipes;