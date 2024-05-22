import { firestore } from "@/firebase/firebasedb";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next/types";

// 댓글 및 별점을 레시피에 추가
const addNewRecipeOpinion = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, name, comment, rating, RCP_SEQ } = req.body;

    try {
        const recipeDocRef = doc(firestore, 'recipes', RCP_SEQ);
        const recipeDocSnap = await getDoc(recipeDocRef);

        if (recipeDocSnap.exists()) {
            const opinion = {
                email,
                name,
                comment,
                rating,
                RCP_SEQ,
            }
            
            await updateDoc(recipeDocRef, {
                // arrayUnion = 지정된 필드가 존재하면 push, 존재하지 않으면 생성 후 push
                opinions: arrayUnion(opinion),
            })
            
            const opinionsFromStore = recipeDocSnap.data().opinions;
            return res.status(200).json({ opinions: opinionsFromStore });
        }
    } catch (error) {
        return res.status(500).json({ error: "댓글 및 평점 추가 실패" });
    }
}

export default addNewRecipeOpinion;