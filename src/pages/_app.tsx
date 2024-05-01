import { AppProps } from 'next/app'
import { Noto_Sans_KR } from 'next/font/google'
import { wrapper } from '@/redux/store';
import '../styles/global.css'
import '../styles/menuTable.css'
import '../styles/scrollStyle.css'
import '../styles/header.css'
import '../styles/svgStyle.css'
import '../styles/modal.css'
import { useDispatch } from 'react-redux';
import { auth } from '@/firebase/firebasedb';
import { User, onAuthStateChanged } from 'firebase/auth';
import { setUser } from '@/redux/features/userSlice';
import logout from '@/utils/logout';
import { useEffect, useState } from 'react';

const noto = Noto_Sans_KR({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

function App({ Component, pageProps }: AppProps) {
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (!user.emailVerified) {
                    // console.log("로그인중 + 이메일 미인증");
                }
                else if (user.emailVerified) {
                    console.log("로그인중 + 이메일 인증 O", user);
                    dispatch(setUser({
                        name: user.displayName,
                        email: user.email,
                    }));
                }
            }
            else {
                console.log("로그인 X");
            }
        });
    }, [])

    useEffect(() => {
        // 사용자가 페이지를 떠나기 전에 이메일 인증 여부를 확인하고, 미인증 상태라면 강제 로그아웃
        const checkBeforeUnload = async (event: any) => {
            const user = auth.currentUser;
            if (user && !user.emailVerified) {
                await logout();
                console.log("이메일 미인증으로 로그아웃");
            }
            else if (user && user.emailVerified) {
                console.log("이메일 인증 완료");
            }
            else if (!user) {
                console.log("사용자 존재하지 않음");
            }
        };

        window.addEventListener('beforeunload', checkBeforeUnload);

        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
            window.removeEventListener('beforeunload', checkBeforeUnload);
        };
    }, []);

    return (
        <>
            <style jsx global>{`
                html, textarea, input {
                    font-family: ${noto.style.fontFamily};
                }
            `}</style>
            <Component {...pageProps} />
        </>
    )
}

export default wrapper.withRedux(App);