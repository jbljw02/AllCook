import bannerImg from "/public/images/banner-img.jpg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setRecomMenu, setDessertMenu, setAllMenu, setDisplayedMenu } from "@/redux/features/menuSlice";
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
import explainImg from "../../public/svgs/explain.svg";

export default function Home() {
    const dispatch = useDispatch();

    const displayedMenu = useSelector((state: RootState) => state.displayedMenu);
    const recomMenu = useSelector((state: RootState) => state.recomMenu);
    const dessertMenu = useSelector((state: RootState) => state.dessertMenu);

    const scrollPassContent = useSelector((state: RootState) => state.scrollPassContent);
    const headerSlide = useSelector((state: RootState) => state.headerSlide);

    // Firebase 스토어에 모든 메뉴를 저장
    // useEffect(() => {
    //     (async () => {
    //         const response = await fetch('/api/fetchRecipe');
    //         console.log("결과 : ", response);
    //     })();
    // }, [])

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
                        <Image src={explainImg} alt={''} />
                        <div className="explain-detail">
                            All Cook을 통해 당신의 주방을 세계의 건강한
                            <br /> 레시피로 가득 채워보세요!
                        </div>
                        <table className="explain-table">
                            <thead>
                                <tr>
                                    {/* td 태그는 중앙정렬 되어있어 border 길이가 너무 길고 조절이 불가능하기 때문에, span 태그를 추가하여 컨트롤 */}
                                    <td>
                                        <span>01</span>
                                    </td>
                                    <td>
                                        <span>02</span>
                                    </td>
                                    <td>
                                        <span>03</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>다양한 레시피</td>
                                    <td>편리한 검색</td>
                                    <td>영양성분 제공</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        All Cook은 한식은 물론, 일식, 양식, 중식에 <br />
                                        이르기까지 다양한 지역을 아우르는 레시피를 <br />
                                        제공합니다. 주방에서 세계를 요리해보세요.
                                    </td>
                                    <td>
                                        재료를 검색하면 해당 재료가 들어가는 <br />
                                        레시피를 찾아드리고, 원하는 메뉴의 이름을 <br />
                                        검색하면 해당 메뉴의 레시피를 제공해드립니다.
                                    </td>
                                    <td>
                                        음식의 레시피 뿐만 아니라 영양성분도 함께 <br />
                                        제공합니다. All Cook과 함께 건강한 식생활을 <br />
                                        시작해보세요.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="learn-more">
                            <Link
                                style={{ textDecoration: "none", color: "inherit" }}
                                href={"/recipe"}>
                                레시피 보기
                            </Link>
                        </div>
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
                {
                    /* 서서히 나타나는 애니메이션 */
                }
                @keyframes fade-in {
                    from {
                    opacity: 0;
                    }
                    to {
                    opacity: 1;
                    }
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
                .explain-detail {
                    text-align: center;
                    font-size: 30px;
                    font-weight: 300;
                    margin-top: 10px;
                    margin-bottom: 50px;
                    font-weight: 400;
                }
                .explain-table {
                    text-align: center;
                }
                .explain-table td {
                    {
                    /* border-right: 1px solid black; */
                    }
                }
                .explain-table thead tr:nth-child(1) td span {
                    padding: 0 28px;
                    font-size: 22px;
                    border-bottom: 1.5px solid #000000;
                    padding-bottom: 5px;
                    font-weight: 600;
                }
                .explain-table thead tr:nth-child(1) td {
                    padding-bottom: 20px;
                }
                .explain-table thead tr:nth-child(2) {
                    font-size: 20px;
                }
                .explain-table thead tr:nth-child(2) td {
                    padding-bottom: 20px;
                }
                .explain-table tbody td {
                    padding: 0px 25px;
                    font-size: 14px;
                }
                .learn-more {
                    margin-top: 60px;
                    margin-bottom: 15px;
                    padding: 15px 25px;
                    color: #ffffff;
                    border: 1px solid black;
                    background-color: #002312;
                    border-radius: 5px;
                    cursor: pointer;
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