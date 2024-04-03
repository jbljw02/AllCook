import { useState } from "react";
import { auth } from "@/firebase/firebasedb";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/router";
import HeaderButton from "@/components/header/HeaderButton";
import Seo from "@/components/Seo";

export type emailForm = {
    email: string,
    submitted: boolean,
    transmitted: boolean,
}

export default function ResetPassword() {
    const router = useRouter();

    // 이메일과 패스워드란에 커서가 위치할 때 스타일을 변경하기 위한 state
    const [emailFocusStyle, setEmailFocusStyle] = useState({
        fill: '#dadada',
        borderColor: '',
    })

    // input에 포커스가 있을 때와 없을 때의 속성을 구분
    const inputFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'email') {
            setEmailFocusStyle({ fill: '#111111', borderColor: '#111111' });
        }
    }
    const inputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'email') {
            setEmailFocusStyle({ fill: '#dadada', borderColor: '' });
        }
    }

    const [formData, setFormdata] = useState<emailForm>({
        email: '',
        submitted: false,
        transmitted: false,
    })

    // 이메일 유효성 검증을 위한 state와 정규식
    const [emailValid, setEmailValid] = useState<boolean>(true);
    let emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z]{2,}$/;

    // input의 바뀌는 값을 감지 
    const formChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormdata({
            ...formData,
            [e.target.name]: e.target.value,
        })

        // 전송이 한 번 클릭되고, 이메일의 값이 바뀔 때 정규식과 일치하는지 검사
        if (formData.submitted && e.target.name === 'email') {
            if (emailRegex.test(e.target.value)) {
                setEmailValid(true);
            }
            else {
                setEmailValid(false);
            }
        }
    }

    // 비밀번호를 재설정
    const resetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, formData.email);
        } catch (error) {
            console.error("비밀번호 재설정 이메일 발송 실패: ", error);
        }
    }

    // form을 전송함(패스워드 재설정)
    const formSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault(); // form의 기본 동작을 막음(조건이 만족해야 전송되도록)
        setFormdata({
            ...formData,
            submitted: true,
        })

        // 이메일이 정규식을 통과하지 못할 경우
        if (!emailRegex.test(formData.email)) {
            setEmailValid(false);
            return;
        }
        // 이메일이 공란일 경우
        if (formData.email === '') {
            return;
        }
        // 이메일과 패스워드가 공란이 아니며, 이메일이 정규식을 통과했을 경우
        if (formData.email !== '' &&
            emailValid) {
            setFormdata({
                ...formData,
                transmitted: true,
            })
            resetPassword();
        }
    }

    return (
        <>
            <div className="container">
                <Seo title="비밀번호 재생성" />
                <HeaderButton />
                <div className="contents-container">
                    <div className="title-container">
                        <div className="title">
                            All Cook 계정의 <br />
                            비밀번호를 재생성합니다.
                        </div>
                        <div className="subtitle">
                            비밀번호를 재설정할 계정의 이메일을 입력해주세요. 설정이 완료되면 <br />
                            새 비밀번호로 로그인 하실 수 있어요.
                        </div>
                    </div>
                    <div className="login-container">
                        <form>
                            <div
                                className='input-div email'
                                id={`${(formData.submitted && (!emailValid || formData.email === '')) ?
                                    'warning-border' :
                                    ''}`}
                                style={{ borderColor: emailFocusStyle.borderColor }}>
                                <svg className="email-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 29" width="30" height="29">
                                    <path fill={emailFocusStyle.fill} fill-rule="evenodd" d="M7 7a2.5 2.5 0 0 0-2.5 2.5v9A2.5 2.5 0 0 0 7 21h15a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 22 7H7ZM5.5 9.5C5.5 8.67 6.17 8 7 8h15c.83 0 1.5.67 1.5 1.5v.17l-9 3.79-9-3.8V9.5Zm0 1.25v7.75c0 .83.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5v-7.75l-8.8 3.71-.2.08-.2-.08-8.8-3.7Z"></path>
                                </svg>
                                <input
                                    className="email-input"
                                    onChange={formChange}
                                    type="text"
                                    name="email"
                                    onFocus={inputFocus}
                                    onBlur={inputBlur}
                                    value={formData.email}
                                    placeholder="이메일" />
                            </div>
                            {
                                formData.submitted && formData.email === '' ?
                                    <div className="input-warning">이메일을 입력해주세요</div> :
                                    null
                            }
                            {
                                formData.submitted && formData.email !== '' && !emailValid ?
                                    <div className="input-warning">유효한 이메일을 입력해주세요</div> :
                                    null
                            }
                            <button
                                type="submit"
                                onClick={formSubmit}>
                                전송
                            </button>
                        </form>
                    </div>
                    {
                        formData.transmitted ?
                            <div className="contents-footer">
                                <div>
                                    비밀번호 재설정을 위한 이메일을 전송해드렸어요.
                                    <br /> 혹시 받지 못하셨나요?
                                </div>
                                <span
                                    className="underline">
                                    다시 보내기
                                </span>
                                <span
                                    className="underline"
                                    onClick={() => router.push('/signIn')}
                                >
                                    로그인
                                </span>
                            </div> :
                            null
                    }
                </div>
            </div >
            <style jsx>{`
                .container {
                    justify-content: flex-start !important;
                }
                .contents-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    margin-top: 175px;
                    color: #111111;
                }
                .title-container {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-start;
                    margin-right: 79px;
                }
                .title {
                    font-size: 26px;
                    font-weight: 400;
                }
                .subtitle {
                    margin-top: 10px;
                    font-size: 15px;
                    font-weight: 300;
                    color: #5c5c5c;
                }
                .login-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 510px;
                    padding: 15px 10px 5px 10px;
                    margin-top: 10px;
                    border-radius: 5px;
                }
                form {
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding-bottom: 20px;
                    width: 100%;
                }
                .input-div {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    border: 1px solid #dadada;
                    border-radius: 5px;
                    transition: 0.15s ease border-color;
                    margin-right: 0px;
                }
                .input-div input {
                    outline: none;
                    width: 100%;
                    height: 42px;
                    font-size: 14px;
                    padding-left: 12px;
                    padding-top: 3px;
                    padding-bottom: 3px;
                    border-radius: 10px;
                    border: none;
                }
                .input-warning {
                    margin-top: 6px;
                    margin-bottom: 12px;
                    margin-left: 2px;
                    font-size: 11.5px;
                    color: #FF0000;
                }
                #warning-border {
                    border-color: #FF0000 !important;
                }
                .login-footer-div {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    font-size: 14px;
                    margin: 20px 2px 30px 2px;
                }
                .login-footer-div div {
                    cursor: pointer;
                }
                .checkbox-div {
                    display: flex;
                    flex-direction: row;
                    cursor: pointer;
                }
                .checkbox-div input {
                    margin-top: 4.2px;
                    cursor: pointer;
                }
                .checkbox-div label {
                    margin-left: 3px;
                    cursor: pointer;
                }
                button {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    padding: 16px 30px;
                    color: #fff;
                    border: 1px solid black;
                    background-color: #002312;
                    border-radius: 10px;
                    cursor: pointer;
                    font-size: 16px;
                    margin-top: 30px;
                }
                .contents-footer {
                    margin-top: 5px;
                    font-size: 15px;
                    margin-right: 188px;
                }
                .contents-footer div {
                    margin-bottom: 8px;
                    font-weight: 300;
                }
                .contents-footer span {
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: 500;
                }
                .contents-footer span:last-child {
                    margin-left: 17.5px;
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