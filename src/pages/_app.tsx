import { AppProps } from 'next/app'
import { Noto_Sans_KR } from 'next/font/google'
import { RootState, wrapper } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '@/firebase/firebasedb';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser } from '@/redux/features/userSlice';
import logout from '@/utils/auth/logout';
import { useCallback, useEffect, useRef } from 'react';
import { setAllMenu, setDisplayedMenu, setDessertMenu, setRecomMenu } from '@/redux/features/menuSlice';
import filterDessert from '@/utils/filterRecomMenu/filterDessert';
import shuffleArray from '@/utils/shuffleArray';
import { setHeaderSlide, setScrollPassContent } from '@/redux/features/scrollSlice';
import getEmailToken from '@/utils/fetch/getEmailToken';
import '../styles/global.css'
import '../styles/menuTable.css'
import '../styles/scrollStyle.css'
import '../styles/header.css'
import '../styles/svgStyle.css'
import '../styles/modal.css'

const noto = Noto_Sans_KR({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

function App({ Component, pageProps }: AppProps) {
    const dispatch = useDispatch();

    // 스크롤이 컨텐츠를 지나쳤는지 여부
    const scrollPassContent = useSelector((state: RootState) => state.scrollPassContent);
    // 헤더의 스타일을 관리하기 위해
    const headerSlide = useSelector((state: RootState) => state.headerSlide);
    const contentsRef = useRef<HTMLDivElement>(null);

    // Firebase 스토어에 모든 메뉴를 저장
    // useEffect(() => {
    //     (async () => {
    //         const response = await fetch('/api/allRecipes/fetchRecipe');
    //     })();
    // }, [])

    useEffect(() => {
        // 헤더가 배너 영역에 도달하면 스타일을 바꾸기 위한 함수
        const checkScrollLocation = () => {
            const margin = 50;
            if (contentsRef.current !== null) {
                // scrollPassContent가 false이며, 스크롤의 위치가 contents-container보다 낮을 경우
                if (
                    !scrollPassContent &&
                    window.scrollY > contentsRef.current.offsetTop + margin
                ) {
                    dispatch(setHeaderSlide(false));
                    dispatch(setScrollPassContent(true));
                }
                // scrollPassContent false이며, 스크롤의 위치가 contents-container보다 높을 경우
                else if (
                    scrollPassContent &&
                    window.scrollY <= contentsRef.current.offsetTop - margin
                ) {
                    /* scrollPassContent가 바로 false로 변경되면 unmount animation을 적용할 수 없음(애니메이션이 적용되기도 전에 컴포넌트가 사라지기 때문). 
                    그렇기 때문에 headerSlide를 통해 애니메이션을 미리 제어하고, 0.5초 뒤에 상태를 변경 */
                    dispatch(setHeaderSlide(true));
                    setTimeout(() => {
                        dispatch(setScrollPassContent(false));
                    }, 300);
                }
            }
        };

        // 스크롤 이벤트 발생시에 함수 호출('이벤트 타입', 이벤트 발생시 실행할 함수)
        window.addEventListener("scroll", checkScrollLocation);

        // 컴포넌트 언마운트시, 혹은 useEffect 재실행 전에 이벤트 리스너 제거
        return () => {
            window.removeEventListener("scroll", checkScrollLocation);
        };
    }, [scrollPassContent, dispatch]);

    // 사용자의 로그인 상태가 변경될 때마다 실행
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (!user.emailVerified) {
                }
                else if (user.emailVerified) {
                    dispatch(setUser({
                        name: user.displayName,
                        email: user.email,
                    }));
                    getEmailToken();
                }
            }
        });
    }, [dispatch]);

    // 사용자의 이메일 인증 여부를 체크
    useEffect(() => {
        // 사용자가 페이지를 떠나기 전에 이메일 인증 여부를 확인하고, 미인증 상태라면 강제 로그아웃
        const checkBeforeUnload = async () => {
            const user = auth.currentUser;
            if (user && !user.emailVerified) {
                logout();
            }
            else if (user && user.emailVerified) {
            }
            else if (!user) {
            }
        };

        window.addEventListener('beforeunload', checkBeforeUnload);

        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
            window.removeEventListener('beforeunload', checkBeforeUnload);
        };
    }, []);

    // DB에 매번 요청을 보내지 않고, 접속 이력이 있는 사용자는 로컬 스토리지에서 값을 가져오도록 함
    const reciveRecipes = useCallback(async () => {
        const cachedRecipes = localStorage.getItem('recipes');
        const recipes = JSON.parse(cachedRecipes as string);

        // 로컬 스토리지에 이미 레시피가 존재하면 DB에 값을 요청하지 않고 가져옴
        if (cachedRecipes) {
            dispatch(setAllMenu(recipes));
            dispatch(setDisplayedMenu(recipes))

            const dessertRecipes = filterDessert(recipes, '후식');
            if (dessertRecipes !== undefined) {
                dispatch(setDessertMenu(shuffleArray(dessertRecipes)));
            }
            const recomRecipes = filterDessert(recipes, '');
            if (recomRecipes !== undefined) {
                dispatch(setRecomMenu(shuffleArray(recomRecipes)));
            }
        }
        // 로컬 스토리지에 레시피가 없다면 DB에서 데이터를 요청하고, 로컬 스토리지에 담음
        else {
            const response = await fetch('/api/allRecipes/reciveRecipes');
            const jsonResponse = await response.json();
            const recipes = await jsonResponse.data;

            dispatch(setAllMenu(jsonResponse.data));
            dispatch(setDisplayedMenu(recipes))

            const dessertRecipes = filterDessert(recipes, '후식');
            if (dessertRecipes !== undefined) {
                dispatch(setDessertMenu(shuffleArray(dessertRecipes)));
            }
            const recomRecipes = filterDessert(recipes, '');
            if (recomRecipes !== undefined) {
                dispatch(setRecomMenu(shuffleArray(recomRecipes)))
            }

            localStorage.setItem('recipes', JSON.stringify(recipes));
        }
    }, [])

    useEffect(() => {
        reciveRecipes();
    }, [reciveRecipes]);

    return (
        <>
            <div ref={contentsRef} className='contents-ref'>
            </div>
            <style jsx global>{`
                html, textarea, input {
                    font-family: ${noto.style.fontFamily};
                }
                .contents-ref {
                    position: absolute;
                    top: 50%;
                }
            `}</style>
            <Component {...pageProps} />
        </>
    )
}

export default wrapper.withRedux(App);