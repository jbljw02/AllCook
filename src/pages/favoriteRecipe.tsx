import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import FolderList from "@/components/favoriteRecipe/FolderList";
import Header from "@/components/header/Header";
import HeaderOnContents from "@/components/header/HeaderOnContents";
import { RootState } from "@/redux/store";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SavedRecipe() {
    const dispatch = useDispatch();

    const [scrollPassContent, setScrollPassContent] = useState(false);  // 스크롤이 컨텐츠 영역을 지났는지
    const [headerSlide, setHeaderSlide] = useState(false);  // 헤더의 슬라이드를 처리하기 위함
    const contentsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 헤더가 배너 영역에 도달하면 스타일을 바꾸기 위한 함수
        const checkScrollLocation = () => {
            const margin = 50;
            if (contentsRef.current !== null) {
                if (!scrollPassContent && window.scrollY > contentsRef.current.offsetTop + margin) {
                    setScrollPassContent(true);
                    setHeaderSlide(false)
                }
                else if (scrollPassContent && window.scrollY <= contentsRef.current.offsetTop - margin) {
                    setHeaderSlide(true)
                    setTimeout(() => {
                        setScrollPassContent(false);
                    }, 300);
                }
            }
        };

        window.addEventListener('scroll', checkScrollLocation);
        return () => {
            window.removeEventListener('scroll', checkScrollLocation);
        };
    }, [scrollPassContent]);

    return (
        <>
            <Seo title="관심 레시피" />
            <div className="container">
                <div ref={contentsRef} className="contents-ref" />
                <div className="container-float-top">
                    <div className="header-container">
                        {
                            // 스크롤이 contents-container 영역을 지나치면 헤더가 사라지도록 설정
                            !scrollPassContent ?
                                <Header
                                    position="relative"
                                    backgroundColor="#ffffff"
                                    color="#111111"
                                    borderColor="#e8e8e8"
                                    svgFill="#000000"
                                    lightLogo={false}
                                    inputBackgroundColor="#f2f2f2" /> :
                                <>
                                    <Header
                                        position="relative"
                                        backgroundColor="#ffffff"
                                        color="#111111"
                                        borderColor="#e8e8e8"
                                        svgFill="#000000"
                                        lightLogo={false}
                                        inputBackgroundColor="#f2f2f2" />
                                    <HeaderOnContents
                                        className={
                                            !headerSlide ?
                                                'slide-down' :
                                                'slide-up'
                                        }
                                    />
                                </>
                        }
                    </div>
                    <div className="contents-container">
                        <div className="title">내가 저장한 레시피</div>
                        <FolderList />
                    </div>
                </div>
                <Footer />
            </div>
            <style jsx>{`
                .contents-container {
                    display: flex;
                    flex-direction: column;
                    color: #111111;
                    margin-top: 80px;
                    margin-left: 270px;
                    margin-right: auto;
                    width: auto;
                    height: 100%;
                }
                .title {
                    display: flex;
                    justify-content: flex-start;
                    flex-direction: row;
                    align-items: flex-start;
                    font-size: 28px;
                    margin-bottom: 25px;
                }
            `}</style>
        </>
    )
}

export const getStaticProps = () => {
    return {
        props: {}
    }
}