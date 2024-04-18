import { firestore } from "@/firebase/firebasedb";
import { doc, getDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

// 레시피에 대한 리뷰 및 평점읇 받아옴
const reciveRecipeOpinion = async (req: NextApiRequest, res: NextApiResponse) => {
    const { RCP_SEQ } = req.body;

    try {
        const recipeDocRef = doc(firestore, 'recipes', RCP_SEQ);
        const recipeDocSnap = await getDoc(recipeDocRef);

        if (recipeDocSnap.exists()) {
            const opinionsFromStore = recipeDocSnap.data().opinions;
            // 레시피에 댓글이 존재하는 경우
            if (opinionsFromStore && opinionsFromStore.length > 0) {
                // const opinionsPerEmail = opinionsFromStore.filter((item: RecipeOpinion) => item.email == email);
                return res.status(200).json({ opinions: opinionsFromStore });
            }
            // 레시피에 댓글이 달린 이력은 있으나 현재는 댓글 존재 X
            else if (opinionsFromStore && opinionsFromStore) {
                return res.status(200).json({ opinions: opinionsFromStore });
            }
            // 레시피에 댓글이 달린 적이 없을 때
            else {
                return res.status(200).json({ opinions: [] });
            }
        }
    } catch (error) {
        console.error("댓글 및 평점 불러오기 실패");
        return res.status(500).json({ error: "댓글 및 평점 불러오기 실패" });
    }
}

export default reciveRecipeOpinion;