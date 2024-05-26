import { firestore } from "@/firebase/firebasedb";
import { Opinions } from "@/redux/features/recipeOpinionSlice";
import { Timestamp, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next/types";

// 댓글 및 별점을 레시피에 추가
const addNewRecipeOpinion = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, name, comment, rating, RCP_SEQ, dateTime } = req.body;

    try {
        const recipeDocRef = doc(firestore, 'recipes', RCP_SEQ);
        const recipeDocSnap = await getDoc(recipeDocRef);
        
        if (recipeDocSnap.exists()) {
            const opinionsFromStore: Opinions[] = recipeDocSnap.data().opinions || [];
            const opinion = {
                email,
                name,
                comment,
                rating,
                RCP_SEQ,
                dateTime: Timestamp.fromDate(new Date(dateTime)),
            }

            // dateTime에서 밀리초 단위를 제거
            const newDateTime = new Date(dateTime);
            newDateTime.setMilliseconds(0);

            // 댓글이 추가될 때 중복 여부를 확인(단시간에 중복된 많은 요청이 들어오는 것을 방지)
            const isDuplicate = opinionsFromStore.some(opinion => {
                const existingDateTime = opinion.dateTime.toDate();
                existingDateTime.setMilliseconds(0);

                return existingDateTime.getTime() === newDateTime.getTime() &&
                    opinion.comment === comment &&
                    opinion.rating === rating &&
                    opinion.RCP_SEQ === RCP_SEQ;
            });

            if (isDuplicate) {
                return res.status(200).json({ error: "중복된 요청" });
            }

            await updateDoc(recipeDocRef, {
                // arrayUnion = 지정된 필드가 존재하면 push, 존재하지 않으면 생성 후 push
                opinions: arrayUnion(opinion),
            })
            
            return res.status(200).json({ opinions: opinionsFromStore });
        }
    } catch (error) {
        return res.status(500).json({ error: "댓글 및 평점 추가 실패" });
    }
}

export default addNewRecipeOpinion;