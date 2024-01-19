import { AppProps } from 'next/app'
import '../styles/global.css'
import { Noto_Sans_KR } from 'next/font/google'
import { createWrapper } from 'next-redux-wrapper';
import { wrapper } from '@/redux/store';

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