import bannerImg from "/public/images/banner-img.jpg";
import Image from "next/image";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Header from "../components/header/Header";
import Footer from "../components/Footer";
import HeaderOnContents from "../components/header/HeaderOnContents";
import Seo from "../components/Seo";
import moveToDetail from "@/utils/moveToDetail";
import { setRecipe } from "@/redux/features/recipeSlice";
import 'react-loading-skeleton/dist/skeleton.css'
import MenuTable from "@/components/table/MenuTable";
import SkeletonUI from "../components/Skeleton";
import ExplainSection from "@/components/home/ExplainSection";

export default function Home() {
    const dispatch = useDispatch();

    const displayedMenu = useSelector((state: RootState) => state.displayedMenu);
    const recomMenu = useSelector((state: RootState) => state.recomMenu);
    const dessertMenu = useSelector((state: RootState) => state.dessertMenu);

    const scrollPassContent = useSelector((state: RootState) => state.scrollPassContent);
    const headerSlide = useSelector((state: RootState) => state.headerSlide);

    // 특정 메뉴를 클릭하면 해당 메뉴의 레시피 페이지로 이동
    const menuClick = (name: string, seq: string) => {
        const selectedMenu = moveToDetail(name, seq, displayedMenu);
        dispatch(setRecipe(selectedMenu));
    }

    return (
        <>
            <Seo title="홈" />
            {/* 홈 화면의 전체 영역을 차지하는 컨테이너  */}
            <div className="container">
                {/* 헤더부터 이미지 배너까지의 영역을 차지하는 컨테이너 */}
                <div className="header-container">
                    {
                        // 스크롤이 contents-container 영역을 지나치면 헤더가 사라지도록 설정
                        !scrollPassContent ? (
                            <Header
                                position="absolute"
                                backgroundColor="transparent"
                                color="#ffffff"
                                borderColor="transparent"
                                svgFill="#ffffff"
                                lightLogo={true}
                                inputBackgroundColor="#ffffff"
                            />
                        ) : (
                            <HeaderOnContents
                                className={!headerSlide ? "slide-down" : "slide-up"}
                            />
                        )
                    }
                    {/* 배너 문구와 검색창을 차지하는 컨테이너 */}
                    <div className="banner-container">
                        <div className="welcome-section">
                            환영합니다! 우리는 All Cook, <br />
                            당신의 요리 파트너입니다
                        </div>
                        <div className="search-section">
                            <div>당신을 위한 모든 레시피를 찾아보세요!</div>
                            <div className="banner-button">
                                <span>
                                    <Link
                                        style={{ textDecoration: "none", color: "inherit" }}
                                        href={"/recipe"}>
                                        지금 레시피 보기
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </div>
                    <span className="banner-img">
                        <Image src={bannerImg} alt={""} layout="responsive" />
                    </span>
                </div>
                {/* 헤더,풋터 및 배너 컨테이너를 제외한 컨텐츠의 영역 */}
                <div className="contents-container">
                    {/* 서비스에 대해 설명하는 영역을 차지하는 컨테이너 */}
                    <div className="explain-container">
                        <ExplainSection />
                    </div>
                    {/* 추천 메뉴 영역을 차지하는 컨테이너 */}
                    <div className="recommend-container">
                        <div className="recommend-title">오늘의 추천 메뉴</div>
                        <div className="recommend-subtitle">
                            All Cook이 추천드리는 메뉴입니다. 오늘은 이 레시피 어떠신가요?
                        </div>
                        {
                            Array.isArray(recomMenu) ?
                                <MenuTable
                                    menu={recomMenu}
                                    category={'recom'}
                                    menuClick={menuClick}
                                /> :
                                <SkeletonUI length={4} />
                        }
                    </div>
                    {/* 추천 후식 영역을 차지하는 컨테이너 */}
                    <div className="recommend-container">
                        <div className="recommend-title">
                            식사 후 허전함을 달래줄 레시피
                        </div>
                        <div className="recommend-subtitle">
                            식사 후엔 후식도 잊지 마세요!
                        </div>
                        {
                            Array.isArray(dessertMenu) ?
                                <MenuTable
                                    menu={dessertMenu}
                                    category={'recom'}
                                    menuClick={menuClick}
                                /> :
                                <SkeletonUI length={4} />
                        }
                    </div>
                </div>
                <Footer />
            </div>
            <style jsx> {`
                .banner-container {
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    margin-top: 340px;
                    margin-right: 675px;
                }
                .welcome-section {
                    color: #ffffff;
                    font-size: 55px;
                }
                .search-section {
                    margin-top: 25px;
                    margin-left: 7px;
                    color: #ffffff;
                }
                .search-section div:nth-child(1) {
                    font-size: 18px;
                    font-weight: 300;
                }
                .banner-button {
                    display: inline-block;
                    margin-top: 40px;
                }
                .banner-button span {
                    padding: 20px 40px;
                    margin-right: 20px;
                    border: 1px solid transparent;
                    border-radius: 12px;
                    font-size: 17px;
                    background-color: #ffffff;
                    color: #111111;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                }
                .banner-button span:hover {
                    background-color: #e1e1e1;
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
                .banner-img {
                    width: 100vw;
                    margin-left: calc(50% - 50vw);
                    margin-right: calc(50% - 50vw);
                }
                .contents-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-bottom: 150px;
                }
                .explain-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding-top: 50px;
                    padding-bottom: 50px;
                    color: #002312;
                    background-color: #f9f7f5;
                    width: 100%;
                }
                .about-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    position: relative;
                    padding-bottom: 50px;
                    margin-bottom: 120px;
                    color: #002312;
                    background-color: #f9f7f5;
                    {
                    /* background-color: #fcfcfa; */
                    }
                }
                .about-title {
                    text-align: center;
                    margin-bottom: 35px;
                    font-size: 35px;
                    font-weight: 700;
                }
                .about-img {
                    opacity: 0.1;
                }
                .recommend-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    position: relative;
                    color: #111111;
                    width: 1080px;
                    margin-top: 130px;
                }
                .recommend-container:nth-child(1) {
                }
                .recommend-title {
                    margin-bottom: 8px;
                    text-align: center;
                    font-size: 30px;
                    font-weight: 700;
                }
                .recommend-subtitle {
                    margin-bottom: 35px;
                    font-size: 13.5px;
                    color: #5c5c5c;
                }
        `}
            </style>
        </>
    );
}

export const getStaticProps = () => {
    return {
        props: {}
    }
}