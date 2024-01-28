import bannerImg from '/public/images/banner-img.jpg'
import aboutImg from '/public/images/about-img.jpg'
import Image from 'next/image'
import { Roboto } from 'next/font/google';
import { RefObject, useEffect, useRef, useState } from 'react';
import { makeStore, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setRecomMenu } from '@/redux/features/recomMenuSlice';
import { wrapper } from '../redux/store';
import { GetServerSidePropsContext } from 'next';
import { menu } from '../redux/store';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer'

const roboto = Roboto({
    subsets: ['latin'],
    weight: ["100", "300", "400", "500", "700", "900"],
})

export default function Home() {

    const [scrollPassContent, setScrollPassContent] = useState(false);  // 스크롤이 컨텐츠 영역을 지났는지
    const contentsRef = useRef<HTMLDivElement>(null);
    const homeRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);

    // 홈 화면에 글자에 split 효과를 주기 위함
    const titleText1 = "환영합니다! 우리는 All Cook,";
    const titleText2 = "당신의 요리 파트너입니다.";
    const [displayedText1, setDisplayedText1] = useState("");
    const [displayedText2, setDisplayedText2] = useState("");

    const recomMenu = useSelector((state: RootState) => state.recomMenu);  // 서버로부터 받아온 추천 메뉴를 저장

    useEffect(() => {
        // titleText를 배열로 만든 후 setTimeout을 이용해 화면의 차례로 출력
        titleText1.split("").forEach((str, index) => {
            setTimeout(() => {
                setDisplayedText1((prev) => prev + str);
            }, index * 60);
        });
        // titleText1이 전부 출력된 후 실행되도록 설정
        titleText2.split("").forEach((str, index) => {
            setTimeout(() => {
                setDisplayedText2((prev) => prev + str);
            }, (index + titleText1.length) * 60);
        });

    }, [titleText1, titleText2])

    // useEffect(() => {
    //     // 타겟 요소가 뷰포트와 교차하는지를 감시
    //     const observer = new IntersectionObserver(
    //         ([e]) => {
    //             console.log("DD");
    //             // true = 교차, false = 비교차
    //             setIsScrolled(!e.isIntersecting);
    //         },
    //         {
    //             root: null,
    //             rootMargin: '600px 0px 0px 0px',
    //         }
    //     );

    //     if (contentsRef.current) {
    //         observer.observe(contentsRef.current);
    //     }

    //     return () => {
    //         if (contentsRef.current) {
    //             observer.unobserve(contentsRef.current);
    //         }
    //     };
    // }, [])

    useEffect(() => {
        // 헤더가 컨텐츠 영역에 도달하면 스타일을 바꾸기 위한 함수
        const checkScrollTop = () => {
            if (contentsRef.current !== null) {
                // scrollPassContent가 false이며, 스크롤의 위치가 contents-container보다 낮을 경우
                if (!scrollPassContent && window.scrollY > contentsRef.current.offsetTop) {
                    setScrollPassContent(true);
                }
                // scrollPassContent false이며, 스크롤의 위치가 contents-container보다 높을 경우
                else if (scrollPassContent && window.scrollY <= contentsRef.current.offsetTop) {
                    setScrollPassContent(false);
                }
            }
        };

        // 스크롤 이벤트 발생시에 함수 호출('이벤트 타입', 이벤트 발생시 실행할 함수)
        window.addEventListener('scroll', checkScrollTop);

        // 컴포넌트 언마운트시, 혹은 useEffect 재실행 전에 이벤트 리스너 제거
        return () => {
            window.removeEventListener('scroll', checkScrollTop);
        };
    }, [scrollPassContent]);

    // 클릭한 곳으로 스크롤을 이동
    // const clickToScroll = (param: RefObject<HTMLDivElement>) => {
    //     if (param === homeRef) {
    //         if (homeRef.current !== null) {
    //             homeRef.current.scrollIntoView({ behavior: 'smooth' });
    //         }
    //     }
    //     else if (param === aboutRef) {
    //         if (aboutRef.current !== null) {
    //             aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    //         }
    //     }
    // }

    return (
        <>
            {/* 홈 화면의 전체 영역을 차지하는 컨테이너  */}
            <div className='container'>
                {/* 헤더부터 이미지 배너까지의 영역을 차지하는 컨테이너 */}
                <div ref={homeRef} className='header-container'>
                    {
                        // 스크롤이 contents-container 영역을 지나치면 헤더 사라지도록 설정
                        !scrollPassContent ?
                            <Header /> :
                            null
                    }
                    {/* 배너 문구와 검색창을 차지하는 컨테이너 */}
                    <div className='banner-container'>
                        <div className='welcome-section'>
                            {displayedText1} <br />
                            {displayedText2}
                        </div>
                        {
                            // 화면에 글자가 모두 출력된 후 fade in 효과를 적용하며 출력
                            displayedText2.length === 14 ?
                                <div className='search-section'>
                                    <div>당신을 위한 1,124개의 레시피</div>
                                    <div className='input-container'>
                                        <input className='search-input' placeholder='메뉴, 재료로 검색' />
                                        <svg className="img-search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="21" height="21">
                                            <path fill="currentColor" d="M3.5 8a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM8 2a6 6 0 1 0 3.65 10.76l3.58 3.58 1.06-1.06-3.57-3.57A6 6 0 0 0 8 2Z"></path></svg>
                                    </div>
                                </div> :
                                ''
                        }
                    </div>
                    {/* 홈 화면의 배너 및 이미지 컨테이너 */}
                    <Image src={bannerImg} alt={''} layout="responsive" />
                </div>

                {/* 헤더 및 배너 컨테이너를 제외한 컨텐츠의 영역 */}
                <div ref={contentsRef} className='contents-container'>

                    {/* 추천 메뉴 영역을 차지하는 컨테이너 */}
                    <div className='recommend-container'>
                        <div className='recommend-title'>
                            오늘의 추천 메뉴
                        </div>
                        <div className='recommend-subtitle'>
                            All Cook이 추천드리는 메뉴입니다. 오늘은 이 레시피 어떠신가요?
                        </div>
                        <table className='recommend-table'>
                            <tbody>
                                <tr>
                                    {
                                        recomMenu && recomMenu.map((item) => {
                                            return (
                                                <td>
                                                    <div className='td-content'>
                                                        <Image
                                                            src={`${item.ATT_FILE_NO_MK}`}
                                                            width={200}
                                                            height={200}
                                                            alt={''}
                                                        />
                                                        <div className='RCP_NM'>{item.RCP_NM}</div>
                                                        <div className='RCP_PAT2'>{item.RCP_PAT2}</div>
                                                    </div>
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* footer 영역을 차지하는 컨테이너 */}
                    <Footer />
                </div>
            </div>

            <style jsx> {`
                {/* 전체 영역 컨테이너 */}
                .container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                    {/* background-color: #FBF9F1; */}
                }

                {/* 헤더 컨테이너 */}
                .header-container {
                    display: flex;
                    flex-direction: column;
                }
                .banner-container {
                    position: absolute;
                    top: 31%;
                    left: 10%;
                }
                {/* 서서히 나타나는 애니메이션 */}
                @keyframes fade-in {
                    from {
                        opacity: 0
                    }
                    to {
                        opacity: ;
                    }
                }
                .welcome-section {
                    color: #ffffff;
                    font-size: 50px;
                    {/* animation: fade-in 2.5s ease-out; */}
                }
                .search-section {
                    display: flex;
                    flex-direction: column;
                    margin-top: 18px;
                    margin-left: 7px;
                    animation: fade-in 2s ease-out;
                }
                .search-section div:nth-child(1) {
                    color: #ffffff;
                    font-size: 18px;
                    font-weight: 300;
                }
                .input-container {
                    display: flex;
                    padding-top: 18px;
                    border: none;
                }
                .search-input {
                    outline: none;
                    width: 300px;
                    height: 30px;
                    font-size: 14px;
                    padding-left: 12px;
                    padding-top: 3px;
                    padding-bottom: 3px;
                    border-radius: 5px;
                    border: none;
                }
                .img-search {
                    position: relative;
                    top: 7px;
                    right: 33px;
                    color: rgb(76, 75, 75);
                    cursor: pointer;
                }

                {/* 헤더 및 배너 컨테이너를 제외한 컨텐츠의 영역 */}
                .contents-container {
                    {/* margin-left: 15%; */}
                    {/* margin-right: 15%; */}
                }

                {/* 추천 메뉴에 대한 컨테이너 */}
                .recommend-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    position: relative;
                    margin-top: 130px;
                    margin-bottom: 160px;
                }
                .recommend-title {
                    margin-bottom: 10px;
                    text-align: center;
                    font-size: 28px;
                    font-weight: 700;
                }
                .recommend-subtitle {
                    margin-bottom: 20px;
                    font-size: 13.5px;
                    color: #5c5c5c;
                }
                .recommend-table {
                    display: flex;
                    flex-direction: column;
                }
                .recommend-table tr td {
                    max-width: 200px;
                    vertical-align: top;
                    align-self: start;
                    transition: transform 0.3s ease;
                    padding: 0 15px;
                }
                .recommend-table tr td:hover {
                    transform: scale(1.05);
                }
                .td-content {
                    cursor: pointer;
                }
                .RCP_NM {
                    text-align: left;
                    font-size: 14.5px;
                    font-weight: 400;
                    word-wrap: break-word;
                    word-break: break-all;
                }
                .RCP_PAT2 {
                    font-size: 12px;
                    color: #5c5c5c;
                }
            `}</style>
        </>
    )
}


export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res }) => {

    const API_KEY = process.env.API_KEY;

    // api 요청을 보낼 첫번째 파라미터와 두번째 파라미터를 1~1124 사이의 랜덤 정수로 생성
    const startParam = Math.floor(Math.random() * 1121) + 1;
    const endParam = startParam + 3;

    const response = await fetch(`http://openapi.foodsafetykorea.go.kr/api/
    ${API_KEY}/COOKRCP01/json/${startParam}/${endParam}`, {
        method: "GET",
    });
    const jsonResult = await response.json();
    const result = jsonResult.COOKRCP01.row;

    const menuData = result.map((item: menu) => {
        // 구조 분해 할당 - 각 item에서 필요한 필드들을 추출 선언
        const { RCP_NM, ATT_FILE_NO_MK, INFO_CAR,
            INFO_ENG, INFO_FAT, INFO_NA, INFO_PRO,
            MANUAL01, MANUAL02, MANUAL03, RCP_NA_TIP,
            RCP_PARTS_DTLS, RCP_PAT2 } = item;
        return {
            RCP_NM, ATT_FILE_NO_MK, INFO_CAR,
            INFO_ENG, INFO_FAT, INFO_NA, INFO_PRO,
            MANUAL01, MANUAL02, MANUAL03, RCP_NA_TIP,
            RCP_PARTS_DTLS, RCP_PAT2
        };
    })

    store.dispatch(setRecomMenu(menuData));

    return {
        props: {}
    }
});