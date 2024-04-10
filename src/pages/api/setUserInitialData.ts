import { NextApiRequest, NextApiResponse } from "next";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from '@/firebase/firebasedb';

// 회원가입을 하면서 회원의 초기 정보를 입력
const setUserInitialData = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, initialFolder } = req.body;

    try {
        const userDocRef = doc(firestore, 'users', email);
        const userDocSnap = await getDoc(userDocRef)

        // 회원이 이미 존재하는 경우
        if (userDocSnap.exists()) {
            res.status(200).json({ success: "회원이 이미 존재" })
        }
        else {
            // users 컬렉션을 생성하고 email 문서에 필드들을 추가함
            await setDoc(doc(firestore, 'users', email), {
                email: email,
                FavoriteRecipe: initialFolder,
            });
            res.status(200).json({ success: "회원가입 후 이메일 추가 전송" });
        }
    } catch (error) {
        res.status(500).json({ error: "이메일 추가 실패" });
    }
}

export default setUserInitialData;