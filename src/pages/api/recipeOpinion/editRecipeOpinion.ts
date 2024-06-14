import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "@/firebase/firebasedb";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Opinions } from "@/redux/features/recipeOpinionSlice";

const editeRecipeOpinion = async (req: NextApiRequest, res: NextApiResponse) => {
    const { RCP_SEQ, id, comment, rating } = req.body;

    try {
        const recipeDocRef = doc(firestore, 'recipes', RCP_SEQ);
        const recipeDocSnap = await getDoc(recipeDocRef);

        if (recipeDocSnap.exists()) {
            const opinionsFromStore = recipeDocSnap.data().opinions;
            const targetIndex = opinionsFromStore.findIndex((item: Opinions) => item.id === id)

            if(targetIndex !== -1) {
                opinionsFromStore[targetIndex].comment = comment;
                opinionsFromStore[targetIndex].isEdited = true;
                opinionsFromStore[targetIndex].rating = rating;

                await updateDoc(recipeDocRef, {
                    opinions: opinionsFromStore,
                })
                return res.status(200).json({ success: "댓글 수정 성공" });
            }
            else {
                return res.status(500).json({error: "댓글을 찾을 수 없음"})
            }
        }
    } catch (error) {
        return res.status(500).json({ error: "댓글 수정 실패" });
    }
};

export default editeRecipeOpinion