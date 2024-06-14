import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "@/firebase/firebasedb";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Opinions } from "@/redux/features/recipeOpinionSlice";

const deleteRecipeOpinion = async (req: NextApiRequest, res: NextApiResponse) => {
    const { RCP_SEQ, id } = req.body;

    try {
        const recipeDocRef = doc(firestore, 'recipes', RCP_SEQ);
        const recipeDocSnap = await getDoc(recipeDocRef);

        if (recipeDocSnap.exists()) {
            const opinionsFromStore = recipeDocSnap.data().opinions;

            const updatedOpinions = opinionsFromStore.filter((item: Opinions) => item.id !== id);

            await updateDoc(recipeDocRef, { opinions: updatedOpinions });

            return res.status(200).json({ success: "댓글 삭제 성공" });
        }
    } catch (error) {
        return res.status(500).json({ error: "댓글 삭제 실패" });
    }
};

export default deleteRecipeOpinion