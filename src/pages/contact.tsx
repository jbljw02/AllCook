import Seo from "@/components/Seo"
import { useState } from "react";
import Image from "next/image";
import contactImage from "/public/images/contact-img.jpg";
import { fetchForm } from "@/utils/nodemailer/fetchForm";
import { addDoc, collection } from "firebase/firestore";
import fireStore from "@/firebase/firestore";
import telSvg from '../../public/svgs/tel.svg';
import mailSvg from '../../public/svgs/mail.svg';
import PiNoticeModal from "@/components/modal/PiNoticeModal";
import PiModal from "@/components/modal/PiModal";
import SubmitModal from "@/components/modal/SubmitModal";
import PersonalInput from "@/components/contact/PersonalInput";
import ContactContent from "@/components/contact/ContactContent";

export type Form = {
    id: string,
    name: string,
    mail: string,
    tel: string,
    content: string,
    submitted: boolean,
}

export default function Contact({ imgSrc }: { imgSrc: string }) {
    // 회원의 문의 내용을 담는 state
    const [formData, setFormData] = useState<Form>({
        id: '',
        name: '',
        mail: '',
        tel: '',
        content: '',
        submitted: false,
    });

    // 이메일 유효성 검증을 위한 state와 정규식
    const [emailValid, setEmailValid] = useState<boolean>(true);
    let emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z]{2,}$/;

    // textarea의 바뀌는 값을 감지
    const formChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })

        // 전송이 한 번 클릭된 후에 이메일 유효성을 검사
        if (formData.submitted && e.target.name === 'mail') {
            if (emailRegex.test(e.target.value)) {
                setEmailValid(true)
            }
            else {
                setEmailValid(false);
            }
        }
    }

    // 작성이 완료된 폼을 전송
    const formSubmit = () => {
        setFormData({
            ...formData,
            submitted: true,
        })

        // 최초 전송시에 이메일 유효성 검사
        if (emailRegex.test(formData.mail)) {
            setEmailValid(true)
        }
        else {
            setEmailValid(false);
        }

        // 모든 필수 항목이 공란이 아니며, 개인정보 처리 방침에 동의했을 경우
        if ((formData.name !== '' &&
            formData.mail !== '' &&
            formData.content !== '') &&
            emailValid &&
            isChecked === true) {
            fetchForm(formData);
            setIsSubmitted(true);
            addDoc(collection(fireStore, 'temp'),
                { formData }
            )
        }
        // 모든 필수 항목이 공란이 아니지만, 개인정보 처리 방침에 동의하지 않았을 경우
        else if ((formData.name !== '' &&
            formData.mail !== '' &&
            formData.content !== '') &&
            emailValid &&
            isChecked === false) {
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
            <div className="contact-img">
                <Image src={imgSrc} alt="" layout="responsive" />
            </div>
            <div className="contents-container">
                {/* 개인정보 처리방침에 동의하지 않았을 경우의 팝업 */}
                <PiNoticeModal
                    isCheckedModalOpen={isCheckedModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    setIsCheckedModalOpen={setIsCheckedModalOpen}
                />
                {/* 문의사항이 전송 완료되었음을 알리는 팝업 */}
                <SubmitModal
                    isSubmitted={isSubmitted}
                    setIsSubmitted={setIsSubmitted}
                />
                {/* 문의 내용에 대한 영역 */}
                <div className="contact-section">
                    <div className="contact-contents">
                        {/* 좌측 영역 */}
                        <div className="contact-left">
                            <div className="contact-header">
                                <div className="contact-title">메시지를 남겨주세요</div>
                                <div className="contact-subtitle">All Cook에게 바라는 점, 궁금한 점 등을 작성해주세요 🧑‍🍳</div>
                            </div>
                            <PersonalInput
                                formData={formData}
                                emailValid={emailValid}
                                formChange={formChange}
                            />
                            <div className="checkbox-div">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={checkboxChange}
                                />
                                <div>
                                    <span onClick={() => setIsModalOpen(true)}>개인정보 처리방침</span>에 동의합니다.
                                    <PiModal
                                        isModalOpen={isModalOpen}
                                        setIsModalOpen={setIsModalOpen}
                                        category="문의"
                                    />
                                </div>
                            </div>
                            {/* 좌측 하단 연락처, 이메일 영역 */}
                            <div className="contact-footer">
                                <div className="tel-section">
                                    <Image src={telSvg} className="tel-svg" alt="" />
                                    <div>010-8511-3589</div>
                                </div>
                                <div className="mail-section">
                                    <Image src={mailSvg} className="mail-svg" alt="" />
                                    <div>jbljw02@naver.com</div>
                                </div>
                            </div>
                        </div>
                        {/* 우측 영역 */}
                        <div className="contact-right">
                            <ContactContent
                                formData={formData}
                                formChange={formChange}
                            />
                            <div onClick={formSubmit} className="contact-submit">전송</div>
                        </div>
                    </div>
                </div>
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
                    margin-top: 270px;
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
                    color: #111111;
                    margin-top: auto;
                    margin-bottom: 11px;
                    {/* margin-top: 76px; */}
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

export const getStaticProps = () => {
    return {
        props: {
            imgSrc: contactImage,
        }
    }
}