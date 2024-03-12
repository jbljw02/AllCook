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

    type Form = {
        id: string,
        name: string,
        mail: string,
        tel: string,
        content: string,
    }

    // 회원의 문의 내용을 담는 state
    const [formData, setFormData] = useState<Form>({
        id: '',
        name: '',
        mail: '',
        tel: '',
        content: '',
    });

    const formChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const formSumbit = () => {
        
    }

    console.log("폼데이터 : ", formData);

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
                    <div className="contact-img">
                        <Image src={contactImage} alt="" layout="responsive" />
                    </div>
                </div>
                <div className="contents-container">
                    {/* 문의 내용에 대한 영역 */}
                    <div className="contact-section">
                        <div className="contact-contents">
                            {/* 좌측 영역 */}
                            <div className="contact-left">
                                <div className="contact-header">
                                    <div className="contact-title">메시지를 남겨주세요</div>
                                    <div className="contact-subtitle">All Cook에게 바라는 점, 궁금한 점 등을 작성해주세요 🧑‍🍳</div>
                                </div>
                                <div className="personal-info">
                                    <div className="name-div">
                                        <ContactInput
                                            name="name"
                                            height="25px"
                                            placeholder="이름"
                                            msgWhether={false}
                                            onChange={formChange}
                                        />
                                    </div>
                                    <div className="personal-div">
                                        <div className="email">
                                            <ContactInput
                                                name="mail"
                                                height="25px"
                                                placeholder="메일"
                                                msgWhether={false}
                                                onChange={formChange}
                                            />
                                        </div>
                                        <div className="tel">
                                            <ContactInput
                                                name="tel"
                                                height="25px"
                                                placeholder="연락처"
                                                msgWhether={false}
                                                onChange={formChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="checkbox-div">
                                    <input type="checkbox"></input>
                                    <div>
                                        <span>개인정보 처리 방침</span>에 동의합니다.
                                    </div>
                                </div>
                                {/* 좌측 하단 연락처, 이메일 영역 */}
                                <div className="contact-footer">
                                    <div className="tel-section">
                                        <svg className="tel-svg" xmlns="http://www.w3.org/2000/svg" width="19px" height="19px" viewBox="0 0 24 24" fill="none">
                                            <path d="M18.7881 14.7644C17.4497 13.4433 15.9296 15.1939 14.9258 16.1847C11.8965 16.7827 6.44379 11.4006 7.6555 9.00853C8.65932 8.01771 10.4328 6.51729 9.09441 5.1962C7.75599 3.87511 5.85724 3.60737 4.85342 4.59819C4.02037 5.42046 3.41451 7.21449 4.92915 11.1016C6.44379 14.9887 8.86722 17.3807 13.0072 19.0751C17.1473 20.7694 18.5609 19.7728 19.394 18.9505C20.3978 17.9597 20.1265 16.0855 18.7881 14.7644Z" stroke="#111111" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <div>010-8511-3589</div>
                                    </div>
                                    <div className="mail-section">
                                        <svg className="mail-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 29" width="23px" height="23px">
                                            <path fill="#111111" fill-rule="evenodd" d="M7 7a2.5 2.5 0 0 0-2.5 2.5v9A2.5 2.5 0 0 0 7 21h15a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 22 7H7ZM5.5 9.5C5.5 8.67 6.17 8 7 8h15c.83 0 1.5.67 1.5 1.5v.17l-9 3.79-9-3.8V9.5Zm0 1.25v7.75c0 .83.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5v-7.75l-8.8 3.71-.2.08-.2-.08-8.8-3.7Z"></path>
                                        </svg>
                                        <div>jbljw02@naver.com</div>
                                    </div>
                                </div>
                            </div>
                            {/* 우측 영역 */}
                            <div className="contact-right">
                                <div className="msg-div">
                                    <div className="msg-title">문의내용</div>
                                    <ContactInput
                                        name="content"
                                        height="190px"
                                        placeholder=""
                                        msgWhether={true}
                                        onChange={formChange}
                                    />
                                </div>
                                <div className="contact-submit">전송</div>
                            </div>
                        </div>

                    </div>
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
                    margin-top: 300px;
                    margin-bottom: 300px;
                    color: #002312;
                }
                .contact-section {
                    display: flex;
                    flex-direction: column;
                    padding: 35px 32px 30px 32px;
                    border-radius: 5px;
                    background-color: #ffffff;
                }
                .contact-contents {
                    display: flex;
                    flex-direction: row;
                }
                .contact-left {
                    display: flex;
                    flex-direction: column;
                    margin-right: 40px;
                }
                .contact-header {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    margin-bottom: 20px;
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
                .personal-info {
                    display: flex;
                    flex-direction: column;
                    margin-right: 20px;
                }
                .name-div {
                    margin-bottom: 20px;
                    width: 400px;
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
                .checkbox-div {
                    display: flex;
                    flex-direction: row;
                    margin-top: 13px;
                }
                .checkbox-div input {
                    margin-top: 5.5px;
                    margin-right: 7px;
                    cursor: pointer;
                }
                .checkbox-div div {
                    font-size: 14.5px;
                }
                .checkbox-div span {
                    text-decoration: underline;
                    cursor: pointer;
                }
                .contact-right {
                    display: flex;
                    flex-direction: column;
                }
                .msg-div {
                    margin-top: 15px;
                    width: 400px;
                }
                .msg-title {
                    font-size: 15.5px;
                    margin-left: 2px;
                    margin-bottom: 10px;
                }
                .contact-submit {
                    display: flex;
                    justify-content: center;
                    margin-top: 40px;
                    margin-right: 1px;
                    width: 360px;
                    padding: 10px 20px;
                    color: #ffffff;
                    border: 1px solid black;
                    background-color: #002312;
                    border-radius: 5px;
                    cursor: pointer;   
                }
                .contact-footer {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    margin-top: 76px;
                    color: #111111;
                }
                .tel-section {
                    display: flex;
                    flex-direction: row;
                    margin-right: 30px;
                    margin-top: 2.5px;
                    font-size: 13px;
                    font-weight: 300;
                }
                .tel-svg {
                    position: relative;
                    top: 1px;
                }
                .tel-section div {
                    margin-left: 4px;
                }
                .mail-section {
                    display: flex;
                    flex-direction: row;
                    font-size: 13px;
                    font-weight: 300;
                }
                .mail-svg {
                    position: relative;
                    top: 0.7px;
                }
                .mail-section div {
                    margin-left: 4px;
                }
            `}</style>
        </>
    )
}