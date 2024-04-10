import firestore from '@/firebase/firebaseAdmin'
import type { NextApiRequest, NextApiResponse } from 'next'

const reciveRecipesFromStore = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const dataFromStore = await firestore.collection('recipes').get();
        const recipes = dataFromStore.docs.map(doc => doc.data());

        return res.status(200).json({ data: recipes });
    } catch (error) {
        return res.status(500).json({ error: "DB 데이터 수신 실패" })
    }

}

export default reciveRecipesFromStore;