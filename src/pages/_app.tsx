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
    return (
        <>
            <style jsx global>{`
                html {
                    font-family: ${noto.style.fontFamily};
                }
            `}</style>
            <Component {...pageProps} />
        </>
    )
}

export default wrapper.withRedux(App);