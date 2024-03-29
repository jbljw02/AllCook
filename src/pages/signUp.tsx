import kakaoLogin from "../../public/images/kakao_login.png"
import Image from "next/image";
import googleLogin from '../../public/svgs/googleLogin.svg';
import backSvg from '../../public/svgs/backBtn.svg';
import closeSvg from '../../public/svgs/closeBtn.svg';
import { useEffect, useState } from "react";
import { auth, firestore } from "@/firebase/firebasedb";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/features/userSlice";
import googleIcon from '../../public/svgs/google-icon.svg';
import { RootState } from "@/redux/store";
import PiNoticeModal from "@/components/modal/PiNoticeModal";
import PiModal from "@/components/modal/PiModal";
import HeaderButton from "@/components/header/HeaderButton";
import EmailVerifyModal from "@/components/modal/EmailVerifyModal";
import logout from "@/utils/logout";

export type signUpForm = {
    name: string,
    email: string,
    password: string,
    passwordDouble: string,
    isCheck: boolean,
    submitted: boolean,
}

export default function login() {
    const dispatch = useDispatch();
    const router = useRouter();

    // 입력란에 커서가 위치할 때 스타일을 변경하기 위한 state
    const [nameFocusStyle, setNameFocusStyle] = useState({
        stroke: '#dadada',
        borderColor: '',
    })
    const [emailFocusStyle, setEmailFocusStyle] = useState({
        fill: '#dadada',
        borderColor: '',
    })
    const [pwdFocusStyle, setPwdFocusStyle] = useState({
        stroke: '#dadada',
        borderColor: '',
    })
    const [pwdDoubleFocusStyle, setPwdDoubleFocusStyle] = useState({
        stroke: '#dadada',
        borderColor: '',
    })

    // input에 포커스가 있을 때와 없을 때의 속성을 구분
    const inputFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'name') {
            setNameFocusStyle({ stroke: '#111111', borderColor: '#111111' });
        }
        if (e.target.name === 'email') {
            setEmailFocusStyle({ fill: '#111111', borderColor: '#111111' });
        }
        if (e.target.name === 'password') {
            setPwdFocusStyle({ stroke: '#111111', borderColor: '#111111' });
        }
        if (e.target.name === 'passwordDouble') {
            setPwdDoubleFocusStyle({ stroke: '#111111', borderColor: '#111111' });
        }
    }
    const inputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'name') {
            setNameFocusStyle({ stroke: '#dadada', borderColor: '' });
        }
        if (e.target.name === 'email') {
            setEmailFocusStyle({ fill: '#dadada', borderColor: '' });
        }
        if (e.target.name === 'password') {
            setPwdFocusStyle({ stroke: '#dadada', borderColor: '' });
        }
        if (e.target.name === 'passwordDouble') {
            setPwdDoubleFocusStyle({ stroke: '#dadada', borderColor: '' });
        }
    }

    const [formData, setFormdata] = useState<signUpForm>({
        name: '',
        email: '',
        password: '',
        passwordDouble: '',
        isCheck: false,
        submitted: false,
    })

    // 비밀번호와 비밀번호 확인란이 일치하는지, 정규식을 통과하는지
    const [pwdRule, setPwdRule] = useState({
        identical: true,
        valid: true,
    });
    // 비밀번호는 최소 6글자 이상이어야 하며, 특수문자를 하나 이상 포함해야 함
    let pwdRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

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
        if (formData.submitted && e.target.name === 'password') {
            if (pwdRegex.test(e.target.value)) {
                setPwdRule({
                    ...pwdRule,
                    valid: true,
                })
            }
            else {
                setPwdRule({
                    ...pwdRule,
                    valid: false,
                })
            }
        }
    }

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    // 회원가입 초기 작업
    const signUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
            const user = userCredential.user;

            // 이메일을 전송한 후,
            await sendEmailVerification(user);
            // 이메일 인증 여부를 확인하는 모달을 띄움
            setIsSubmitted(true);
        }
        catch (error) {
            console.log("회원가입 정보 전송 실패 : ", error);
        }
    }

    // form을 전송함
    const formSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault(); // form의 기본 동작을 막음(조건이 만족해야 전송되도록)
        setFormdata({
            ...formData,
            submitted: true,
        })

        // 비밀번호가 정규식을 통과하지 못할 경우
        if (!pwdRegex.test(formData.password)) {
            setPwdRule({
                ...pwdRule,
                valid: false,
            })
        }

        // 비밀번호가 정규식을 통과했으며, 비밀번호 확인란과 일치하는지 확인
        if (pwdRegex.test(formData.password)) {
            if (formData.password === formData.passwordDouble) {
                setPwdRule({
                    ...pwdRule,
                    identical: true,
                });
            }
            else if (formData.password !== formData.passwordDouble) {
                setPwdRule({
                    ...pwdRule,
                    identical: false,
                });
            }
        }

        // 이메일이 정규식을 통과하지 못할 경우
        if (!emailRegex.test(formData.email)) {
            setEmailValid(false);
        }

        /*
            1. 공란인 항목이 없음
            2. 이메일 및 비밀번호 유효성 검사 완료
            3. 비밀번호와 비밀번호 확인란이 일치 
        */
        if (formData.name !== '' &&
            formData.email !== '' &&
            formData.password !== '' &&
            formData.passwordDouble !== '' &&
            emailValid &&
            pwdRule.valid &&
            pwdRule.identical
        ) {
            if (formData.isCheck) {
                signUp();
                console.log("성공");
            }
            // 개인정보 처리 방침에 동의하지 않은 경우
            else {
                setIsCheckedModalOpen(true);

            }
        }
    }

    const googleAuth = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // 구글 인증 성공
                const user = result.user;
                if (user.displayName !== null) {
                    dispatch(setUser((user.displayName).slice(0, 3)));
                }
                router.push('/')
            })
            .catch((error) => {
                // 인증 실패 처리
                console.error("구글 인증 실패: ", error);
            });
    };

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 개인정보 처리방침 모달 관리
    const [isCheckedModalOpen, setIsCheckedModalOpen] = useState<boolean>(false); // 개인정보 처리방침에 동의하지 않았을 경우 나올 모달 관리

    return (
        <>
            <div className="container">
                <HeaderButton />
                <div className="contents-container">
                    <PiNoticeModal
                        isCheckedModalOpen={isCheckedModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        setIsCheckedModalOpen={setIsCheckedModalOpen}
                    />
                    <PiModal
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        category="회원가입"
                    />
                    <EmailVerifyModal
                        isSubmitted={isSubmitted}
                        setIsSubmitted={setIsSubmitted}
                        formData={formData}
                    />
                    <div className="title-container">
                        <div className="title">회원가입</div>
                        <div className="subtitle">All Cook은 불필요한 개인정보를 수집하지 않아요.</div>
                    </div>
                    <div className="login-container">
                        <form>
                            <div
                                className='input-div name'
                                id={`${formData.submitted && formData.name === '' ?
                                    'warning-border' :
                                    ''}`}
                                style={{ borderColor: nameFocusStyle.borderColor }}>
                                <svg className="name-svg" xmlns="http://www.w3.org/2000/svg" width="23px" height="20px" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke={nameFocusStyle.stroke} stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke={nameFocusStyle.stroke} stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <input
                                    className="name-input"
                                    onChange={formChange}
                                    type="text"
                                    name="name"
                                    onFocus={inputFocus}
                                    onBlur={inputBlur}
                                    value={formData.name}
                                    placeholder="이름" />
                            </div>
                            {
                                formData.submitted && formData.name === '' ?
                                    <div className="input-warning">이름을 입력해주세요</div> :
                                    null
                            }
                            <div
                                className='input-div email'
                                id={`${formData.submitted && (!emailValid || formData.email === '') ?
                                    'warning-border'
                                    : ''}`}
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
                                <div className="email-verify">중복확인</div>
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
                            <div
                                className="input-div password"
                                id={`${formData.submitted && (formData.password === '' || !pwdRule.valid) ?
                                    'warning-border' :
                                    ''}`}
                                style={{ borderColor: pwdFocusStyle.borderColor }}>
                                <svg className="password-svg" xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 30 29" fill="none">
                                    <rect x="3" y="11" width="18" height="11" rx="2" stroke={pwdFocusStyle.stroke} stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M7 10.9999V6.99988C7 4.23845 9.23858 1.99988 12 1.99988V1.99988C14.7614 1.99988 17 4.23845 17 6.99988V10.9999" stroke={pwdFocusStyle.stroke} stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <input
                                    className="password-input"
                                    onChange={formChange}
                                    type="password"
                                    name="password"
                                    onFocus={inputFocus}
                                    onBlur={inputBlur}
                                    value={formData.password}
                                    placeholder="비밀번호" />
                            </div>
                            {
                                formData.submitted && formData.password === '' ?
                                    <div className="input-warning">비밀번호를 입력해주세요</div> :
                                    null
                            }
                            {
                                formData.submitted && formData.password !== '' && !pwdRule.valid ?
                                    <div className="input-warning">비밀번호는 6자 이상, 최소 한 개의 특수문자를 포함해야 합니다</div> :
                                    null
                            }
                            <div
                                className="input-div password"
                                id={`${formData.submitted &&
                                    formData.password !== '' &&
                                    !pwdRule.identical ?
                                    'warning-border' :
                                    ''}`}
                                style={{ borderColor: pwdDoubleFocusStyle.borderColor }}>
                                <svg className="password-svg" xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 30 29" fill="none">
                                    <rect x="3" y="11" width="18" height="11" rx="2" stroke={pwdDoubleFocusStyle.stroke} stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M7 10.9999V6.99988C7 4.23845 9.23858 1.99988 12 1.99988V1.99988C14.7614 1.99988 17 4.23845 17 6.99988V10.9999" stroke={pwdDoubleFocusStyle.stroke} stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <input
                                    className="password-input"
                                    onChange={formChange}
                                    type="password"
                                    name="passwordDouble"
                                    onFocus={inputFocus}
                                    onBlur={inputBlur}
                                    value={formData.passwordDouble}
                                    placeholder="비밀번호 확인" />
                            </div>
                            {
                                formData.submitted && formData.password !== '' && !pwdRule.identical ?
                                    <div className="input-warning">비밀번호가 일치하지 않아요</div> :
                                    null
                            }
                            <div className="login-footer-div">
                                <div className="checkbox-div no-drag">
                                    <input
                                        type="checkbox"
                                        checked={formData.isCheck}
                                        onClick={() => setFormdata({
                                            ...formData,
                                            isCheck: !formData.isCheck,
                                        })} />
                                    <label htmlFor="checkbox" />
                                    <div
                                        className="underline"
                                        onClick={() => setIsModalOpen(true)}>
                                        개인정보 처리방침
                                    </div>에 동의합니다.
                                </div>
                            </div>
                            <button
                                type="submit"
                                onClick={formSubmit}>
                                회원가입
                            </button>
                        </form>
                        <div
                            className="social-login-container"
                            onClick={googleAuth}>
                            <Image
                                src={googleIcon}
                                className="google-svg"
                                alt="" />
                            <div>구글 계정으로 로그인</div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .container {
                    justify-content: flex-start !important;
                }
                .contents-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    margin-top: 90px;
                    color: #111111;
                }
                .title-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .title {
                    font-size: 26px;
                    font-weight: 500;
                }
                .subtitle {
                    margin-top: 6px;
                    font-size: 15px;
                    color: #5c5c5c;
                }
                .login-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 510px;
                    padding: 25px 10px 40px 10px;
                    margin-top: 10px;
                    border-radius: 5px;
                }
                form {
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding-bottom: 40px;
                    border-bottom: 1px solid #a8a8a8;
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
                .password, .email {
                    margin-top: 15px;
                }
                .email-verify {
                    display: flex;
                    justify-content: center;
                    font-size: 12px;
                    width: 60px;
                    cursor: pointer;
                    margin-right: 10px;
                    color: #323232;
                    background-color: #f2f2f2;
                    border-radius: 4px;
                    padding: 4px 6px;
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
                .checkbox-div {
                    display: flex;
                    flex-direction: row;
                }
                .checkbox-div input {
                    margin-top: 4.2px;
                    cursor: pointer;
                }
                .checkbox-div input {
                    margin-top: 4.5px;
                }
                .checkbox-div label {
                    margin-left: 3px;
                }
                .checkbox-div div {
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
                }
                .social-login-container {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    width: 100%;
                    margin-top: 40px;
                    border: 1px solid #9a9a9a;
                    border-radius: 10px;
                    padding: 10px 0px;
                    cursor: pointer;
                }
                .social-login-container div {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-left: 3px;
                    color: #111111;
                    font-size: 15px;
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