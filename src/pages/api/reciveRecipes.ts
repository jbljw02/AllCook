import { firestore } from '@/firebase/firebasedb';
import { collection } from '@firebase/firestore';
import { getDocs } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next'

const reciveRecipes = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const recipesRef = collection(firestore, 'recipes');
        const recipesSnap = await getDocs(recipesRef);

        const recipes = recipesSnap.docs.map(doc => doc.data());

        return res.status(200).json({ data: recipes });
    } catch (error) {
        return res.status(500).json({ error: "DB 데이터 수신 실패" })
    }

}

export default reciveRecipes;