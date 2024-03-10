import Header from "../components/Header"
import Footer from "../components/Footer"
import Seo from "@/components/Seo"
import HeaderOnContents from "@/components/HeaderOnContents";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import contactImage from "/public/images/contact-img.jpg";
import ContactInput from "@/components/ContactInput";

export default function Contact() {
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
            <Seo title="문의" />
            <div ref={contentsRef} className="contents-ref" />
            <div className="container">
                <div className="header-container">
                    {
                        // 스크롤이 contents-container 영역을 지나치면 헤더가 사라지도록 설정
                        !scrollPassContent ?
                            <Header
                                position="absolute"
                                backgroundColor="transparent"
                                color="#ffffff"
                                borderColor="transparent"
                                svgFill="#ffffff"
                                lightLogo={true}
                                inputBackgroundColor="#ffffff"
                            /> :
                            <>
                                <Header
                                    position="absolute"
                                    backgroundColor="transparent"
                                    color="#ffffff"
                                    borderColor="transparent"
                                    svgFill="#ffffff"
                                    lightLogo={true}
                                    inputBackgroundColor="#ffffff"
                                />
                                <HeaderOnContents
                                    className={
                                        !headerSlide ?
                                            'slide-down' :
                                            'slide-up'
                                    }
                                />
                            </>
                    }
                    <div className="contact-introduce">
                        <div className="intro-title">문의하기</div>
                        <div className="intro-subtitle"></div>
                    </div>
                    <div className="contact-img">
                        <Image src={contactImage} alt="" layout="responsive" />
                    </div>
                </div>
                <div className="contents-container">
                    {/* 문의 내용에 대한 영역 */}
                    <div className="contact-section">
                        <div className="contact-header">
                            <div className="contact-title">메시지를 남겨주세요</div>
                            <div className="contact-subtitle">All Cook에게 아쉬운 점, 궁금한 점 등을 작성해주세요 🧑‍🍳</div>
                        </div>
                        <div className="contact-detail">
                            <div className="name-div">
                                <ContactInput height="35px" placeholder="이름" msgWhether={false} />
                            </div>
                            <div className="personal-div">
                                <div className="email">
                                    <ContactInput height="35px" placeholder="메일" msgWhether={false} />
                                </div>
                                <div className="tel">
                                    <ContactInput height="35px" placeholder="연락처" msgWhether={false} />
                                </div>
                            </div>
                            <div className="msg-div">
                                <div className="msg-title">문의내용</div>
                                <ContactInput height="150px" placeholder="" msgWhether={true} />
                            </div>
                        </div>
                        <div className="contact-submit">전송</div>
                    </div>
                    {/* 연락처와 이메일 등 연락 수단에 대한 영역 */}
                    <div className="contact-info-section">연락처</div>
                </div>
                <Footer />
            </div>
            <style jsx>{`
                .contact-introduce {
                    display: flex;
                    flex-direction: column;
                    margin-top: 180px;
                    color: #ffffff;
                }
                .intro-title {
                    padding-bottom: 10px;
                    font-size: 45px;
                    font-weight: 400;
                }
                .intro-subtitle {
                    margin-left: 5px;
                    width: 100px;
                }
                .contact-img {
                    position: fixed;
                    height: 100%;
                    z-index: -1;
                }
                .contents-container {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    width: 100%;
                    margin-top: 50px;
                    color: #002312;
                }
                .contact-section {
                    display: flex;
                    flex-direction: column;
                    padding: 33px 30px 40px 32px;
                    margin-right: 100px;
                    margin-bottom: 100px;
                    border-radius: 5px;
                    background-color: #ffffff;
                }
                .contact-header {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    margin-bottom: 30px;
                }
                .contact-title {
                    font-size: 22px;
                }
                .contact-subtitle {
                    margin-top: 6px;
                    margin-left: 2px;
                    font-size: 14px;
                    color: #5C5C5C;
                }
                .contact-detail {
                    display: flex;
                    flex-direction: column;
                }
                .name-div {
                    margin-bottom: 20px;
                    width: 416px;
                }               
                .personal-div {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    margin-bottom: 20px;
                }
                .email, .tel {
                    width: 185px;
                }
                .msg-div {
                    margin-top: 15px;
                    width: 415px;
                }
                .msg-title {
                    font-size: 15px;
                    margin-left: 2px;
                    margin-bottom: 10px;
                }
                .contact-submit {
                    display: flex;
                    justify-content: center;
                    margin-top: 45px;
                    margin-right: 1px;
                    width: 375px;
                    padding: 10px 20px;
                    color: #ffffff;
                    border: 1px solid black;
                    background-color: #002312;
                    border-radius: 5px;
                    cursor: pointer;   
                }
                .contact-info-section {
                    color: #ffffff;
                }
            `}</style>
        </>
    )
}