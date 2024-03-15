import Header from "../components/Header"
import Footer from "../components/Footer"
import Seo from "@/components/Seo"
import HeaderOnContents from "@/components/HeaderOnContents";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import contactImage from "/public/images/contact-img.jpg";
import ContactInput from "@/components/ContactInput";
import { fetchForm } from "@/utils/nodemailer/fetchForm";
import Modal from 'react-modal';
// import sendMail from "@/api/sendMail";

export type Form = {
    id: string,
    name: string,
    mail: string,
    tel: string,
    content: string,
}

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

    // 작성이 완료된 폼을 전송
    const formSubmit = () => {
        // 개인정보 처리 방침에 동의했을 경우
        if (isChecked === true) {
            fetchForm(formData);
            setIsSubmitted(true);
        }
        // 동의하지 않았을 경우는 모달을 띄움
        else {
            setIsCheckedModalOpen(true);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 개인정보 처리방침 모달 관리
    const [isCheckedModalOpen, setIsCheckedModalOpen] = useState<boolean>(false); // 개인정보 처리방침에 동의하지 않았을 경우 나올 모달 관리
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false); // 문의사항이 전송 완료되었음에 대한 모달 관리
    const [isChecked, setIsChecked] = useState<boolean>(false); // 개인정보 처리방침이 체크 되었는지

    // 개인정보 처리방침을 체크하면 state를 변경
    const checkboxChange = (e: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setIsChecked(e.target.checked);
    }

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
                    {/* 개인정보 처리방침에 동의하지 않았을 경우의 팝업 */}
                    <Modal
                        isOpen={isCheckedModalOpen}
                        style={{
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.5)'
                            },
                            content: {
                                position: 'absolute',
                                left: '50%',
                                top: '45%',
                                width: 470,
                                height: 190,
                                transform: 'translate(-50%, -50%)',
                            }
                        }}
                    >
                        <div className="pop-up-container">
                            <div className="pop-up-title-section">
                                문의를 접수하기 전에 개인정보 처리방침에 대한 동의가 필요합니다.
                                서비스 이용을 위해 개인정보 처리방침을 확인하시고, 동의해 주시기 바랍니다.
                            </div>
                            <div className="pop-up-btn-section">
                                <div
                                    className="read-btn"
                                    onClick={() => {
                                        setIsModalOpen(true);
                                        setIsCheckedModalOpen(false);
                                    }}>읽기</div>
                                <div
                                    className="close-btn"
                                    onClick={() => setIsCheckedModalOpen(false)
                                    }>닫기</div>
                            </div>
                        </div>
                    </Modal>
                    {/* 문의사항이 전송 완료되었음을 알리는 팝업 */}
                    <Modal
                        isOpen={isSubmitted}
                        style={{
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.5)'
                            },
                            content: {
                                position: 'absolute',
                                left: '50%',
                                top: '45%',
                                width: 470,
                                height: 190,
                                transform: 'translate(-50%, -50%)',
                            }
                        }}
                    >
                        <div className="pop-up-container">
                            <div className="pop-up-title-section">문의사항이 전송 완료되었습니다! <br />
                                소중한 의견 감사드리며, 작성하신 이메일을 통해 문의사항에 대한 답변을 드릴테니 조금만 기다려 주세요.</div>
                            <div className="pop-up-btn-section">
                                <div
                                    className="read-btn"
                                    onClick={() => setIsSubmitted(false)
                                    }>확인</div>
                            </div>
                        </div>
                    </Modal>
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
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={checkboxChange}
                                    ></input>
                                    <div>
                                        <span onClick={() => setIsModalOpen(true)}>개인정보 처리방침</span>에 동의합니다.
                                        <Modal
                                            isOpen={isModalOpen}
                                            style={{
                                                overlay: {
                                                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                                                },
                                                content: {
                                                    position: 'absolute',
                                                    left: '50%',
                                                    top: '50%',
                                                    width: 550,
                                                    height: 700,
                                                    transform: 'translate(-50%, -50%)',
                                                }
                                            }}
                                        >
                                            <div className="modal-container">
                                                <div className="pi-header">
                                                    <div className="pi-rule">개인정보 처리방침</div>
                                                    <svg className="close-svg" onClick={() => setIsModalOpen(false)} xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" viewBox="0 0 24 24" fill="none">
                                                        <rect width="24" height="24" fill="white" />
                                                        <path d="M7 17L16.8995 7.10051" stroke="#111111" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M7 7.00001L16.8995 16.8995" stroke="#111111" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                </div>
                                                <div className="pi-section">
                                                    <div className="pi-section-title">1. 개인정보 수집 이용에 대한 동의</div>
                                                    <div className="pi-section-detail">
                                                        귀하의 개인정보는 아래의 방침에 따라 수집 및 이용됩니다. <br />
                                                        All Cook은 필요한 최소한의 개인정보만을 수집하며, 수집된 개인정보는 철저한 보호와 관리를 통해 취급될 것임을 약속드립니다. <br />
                                                        이에 따라, 개인정보의 수집 및 활용에 관한 귀하의 동의를 요청드립니다.
                                                    </div>
                                                </div>
                                                <div className="pi-section">
                                                    <div className="pi-section-title">2. 개인정보의 수집 목적</div>
                                                    <div className="pi-section-detail">
                                                        귀하의 문의에 대한 답변을 드리기 위해 개인정보가 수집됩니다.
                                                    </div>
                                                </div>
                                                <div className="pi-section">
                                                    <div className="pi-section-title">3. 개인정보의 수집 항목</div>
                                                    <div className="pi-section-detail">
                                                        필수항목 : 성명, 이메일, 문의내용 <br />
                                                        선택항목 : 연락처
                                                    </div>
                                                </div>
                                                <div className="pi-section">
                                                    <div className="pi-section-title">4. 개인정보의 보존 기간</div>
                                                    <div className="pi-section-detail">
                                                        보존기간 : 문의사항 처리시까지 <br />
                                                        개인정보 수집 목적이 달성된 후에는 해당 정보를 즉시 파기합니다.
                                                    </div>
                                                </div>
                                                <div className="pi-section">
                                                    <div className="pi-section-title">5. 개인정보 수집을 거부할 수 있는 권리 및 거부 시의 영향</div>
                                                    <div className="pi-section-detail">
                                                        문의 처리를 위해 필수적인 개인정보의 수집 및 이용에 대한 동의는 필수입니다. 이에 동의하지 않으시면, 문의에 대한 처리를 받으실 수 없습니다.  <br />
                                                        선택항목에 대한 수집 및 이용에 관해서는 동의를 거부할 권리가 있습니다. 선택항목에 대한 정보를 제공하지 않으시면, 해당 정보의 수집 및 이용에 관해서는 동의하지 않은 것으로 간주됩니다.
                                                    </div>
                                                </div>
                                            </div>
                                        </Modal>
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
                                    <label className="msg-title">문의내용</label>
                                    <ContactInput
                                        name="content"
                                        height="190px"
                                        placeholder=""
                                        msgWhether={true}
                                        onChange={formChange}
                                    />
                                </div>
                                <div onClick={formSubmit} className="contact-submit">전송</div>
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
                .modal-container {
                    width: 480px;
                    margin: 18px;
                    color: #111111;
                }
                .pi-header {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    margin-top: 20px;
                }
                .pi-rule {
                    font-size: 23px;
                    font-weight: 600;
                }
                .close-svg {
                    position: relative;
                    left: 62px;
                    bottom: 27px;
                    cursor: pointer;
                }
                .pi-section {
                    margin-top: 25px;
                }
                .pi-section-title {
                    font-size: 17px;
                    font-weight: 600;
                    margin-bottom: 10px;
                }
                .pi-section-detail {
                    font-size: 15px;
                    font-weight: 300;
                }
                .pop-up-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    text-align: center;
                    margin: 20px;
                }
                .pop-up-title-section {
                    font-size: 17px;
                }
                .pop-up-btn-section {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    margin-top: 40px;
                    font-size: 14px;
                }
                .pop-up-btn-section div {
                    border: 1px solid transparent;
                    border-radius: 5px;
                    padding: 12px 85px;
                    cursor: pointer;
                }
                .read-btn {
                    color: #ffffff;
                    background-color: #002312;
                    margin-right: 25px;
                }
                .close-btn {
                    color: #5C5C5C;
                    background-color: #f2f2f2;
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