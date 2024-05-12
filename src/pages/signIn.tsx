import Image from "next/image";
import { useState } from "react";
import { auth, firestore } from "@/firebase/firebasedb";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/features/userSlice";
import googleIcon from '../../public/svgs/google-icon.svg';
import { FirebaseError } from "firebase/app";
import HeaderButton from "@/components/header/HeaderButton";
import logout from "@/utils/auth/logout";
import EmailVerifyModal from "@/components/modal/EmailVerifyModal";
import Seo from "@/components/Seo";
import googleAuth from "@/utils/auth/googleAuth";
import { RootState } from "@/redux/store";
import FormInput from "@/components/input/FormInput";
import axios from "axios";
import getEmailToken from "@/utils/fetch/getEmailToken";

export type loginForm = {
    email: string,
    password: string,
    isSave: boolean,
    submitted: boolean,
}

export default function login() {
    const dispatch = useDispatch();
    const router = useRouter();

    // 이메일과 패스워드란에 커서가 위치할 때 스타일을 변경하기 위한 state
    const [emailFocusStyle, setEmailFocusStyle] = useState({
        fill: '#dadada',
        borderColor: '',
    })
    const [pwdFocusStyle, setPwdFocusStyle] = useState({
        stroke: '#dadada',
        borderColor: '',
    })

    // input에 포커스가 있을 때와 없을 때의 속성을 구분
    const inputFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'email') {
            setEmailFocusStyle({ fill: '#111111', borderColor: '#111111' });
        }
        if (e.target.name === 'password') {
            setPwdFocusStyle({ stroke: '#111111', borderColor: '#111111' });
        }
    }
    const inputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'email') {
            setEmailFocusStyle({ fill: '#dadada', borderColor: '' });
        }
        if (e.target.name === 'password') {
            setPwdFocusStyle({ stroke: '#dadada', borderColor: '' });
        }
    }

    const [formData, setFormData] = useState<loginForm>({
        email: '',
        password: '',
        isSave: false,
        submitted: false,
    })

    const [isSuccess, setIsSucceess] = useState<boolean>(true); // 회원 정보가 일치하는지
    const [isVerifyFail, setIsVerifyFail] = useState<boolean>(false); // 이메일 인증 여부 확인

    // 이메일 유효성 검증을 위한 state와 정규식
    const [emailValid, setEmailValid] = useState<boolean>(true);
    let emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z]{2,}$/;

    // input의 바뀌는 값을 감지 
    const formChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
        setIsSucceess(true);

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

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const user = auth.currentUser;

            // 로그인된 사용자의 이메일 인증 여부 확인
            if (user && user.emailVerified) {
                console.log("이메일 인증 완료, 로그인");
                setIsSucceess(true);
                setIsVerifyFail(false);

                getEmailToken();

                router.push('/');
            }
            // 이메일 인증이 완료되지 않았을 경우, 인증 모달 팝업
            else {
                setIsVerifyFail(true);
                console.log("이메일 인증 미완료, 로그인 X");
            }
        }
        catch (error) {
            if (error instanceof FirebaseError) {
                console.log("로그인 실패 : ", error.code);
                setIsSucceess(false);
            }
        }
    }

    // form을 전송함
    const formSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault(); // form의 기본 동작을 막음(조건이 만족해야 전송되도록)

        setFormData({
            ...formData,
            submitted: true,
        })

        // 이메일이 정규식을 통과하지 못할 경우
        if (!emailRegex.test(formData.email)) {
            setEmailValid(false);
            return;
        }
        // 이메일 혹은 패스워드가 공란일 경우
        if (formData.email === '' || formData.password === '') {
            return;
        }
        // 이메일과 패스워드가 공란이 아니며, 이메일이 정규식을 통과했을 경우
        if (formData.email !== '' &&
            formData.password !== '' &&
            emailValid) {
            signIn();
        }
    }

    const favoriteRecipe = useSelector((state: RootState) => state.favoriteRecipe);

    const googleLogin = async () => {
        const { user, token } = await googleAuth(favoriteRecipe);

        dispatch(setUser({
            email: user.email,
            name: user.name,
        }));

        // 인증이 완료된 토큰을 쿠키에 저장(제한시간: 1시간)
        document.cookie = `authToken=${token}; path=/; max-age=3600; samesite=strict`;
    }

    return (
        <>
            <div className="container">
                <Seo title="로그인" />
                <HeaderButton />
                <EmailVerifyModal
                    isSubmitted={isVerifyFail}
                    setIsSubmitted={setIsVerifyFail}
                />
                <div className="contents-container">
                    <div className="title-container">
                        <div className="title">로그인</div>
                        <div className="subtitle">All Cook에 오신 것을 환영합니다!</div>
                    </div>
                    <div className="login-container">
                        <form>
                            <div
                                className='input-div email'
                                id={`${(formData.submitted && (!emailValid || formData.email === ''))
                                    || !isSuccess ?
                                    'warning-border' :
                                    ''}`}
                                style={{ borderColor: emailFocusStyle.borderColor }}>
                                <svg className="email-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 29" width="30" height="29">
                                    <path fill={emailFocusStyle.fill} fill-rule="evenodd" d="M7 7a2.5 2.5 0 0 0-2.5 2.5v9A2.5 2.5 0 0 0 7 21h15a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 22 7H7ZM5.5 9.5C5.5 8.67 6.17 8 7 8h15c.83 0 1.5.67 1.5 1.5v.17l-9 3.79-9-3.8V9.5Zm0 1.25v7.75c0 .83.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5v-7.75l-8.8 3.71-.2.08-.2-.08-8.8-3.7Z"></path>
                                </svg>
                                <FormInput
                                    type="text"
                                    name="email"
                                    formData={formData}
                                    formChange={formChange}
                                    value={formData.email}
                                    inputFocus={inputFocus}
                                    inputBlur={inputBlur}
                                    placeholder="이메일"
                                />
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
                                id={`${(formData.submitted && formData.password === '') ||
                                    !isSuccess ?
                                    'warning-border' :
                                    ''}`}
                                style={{ borderColor: pwdFocusStyle.borderColor }}>
                                <svg className="password-svg" xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 30 29" fill="none">
                                    <rect x="3" y="11" width="18" height="11" rx="2" stroke={pwdFocusStyle.stroke} stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M7 10.9999V6.99988C7 4.23845 9.23858 1.99988 12 1.99988V1.99988C14.7614 1.99988 17 4.23845 17 6.99988V10.9999" stroke={pwdFocusStyle.stroke} stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <FormInput
                                    type="password"
                                    name="password"
                                    formData={formData}
                                    formChange={formChange}
                                    value={formData.password}
                                    inputFocus={inputFocus}
                                    inputBlur={inputBlur}
                                    placeholder="비밀번호"
                                />
                            </div>
                            {
                                formData.submitted && formData.password === '' ?
                                    <div className="input-warning">비밀번호를 입력해주세요</div> :
                                    null
                            }
                            {
                                !isSuccess ?
                                    <div className="input-warning">이메일 또는 비밀번호가 일치하지 않습니다</div> :
                                    null
                            }
                            <div className="login-footer-div">
                                <div
                                    className="checkbox-div no-drag"
                                    onClick={() => setFormData({
                                        ...formData,
                                        isSave: !formData.isSave,
                                    })}>
                                    <input
                                        type="checkbox"
                                        checked={formData.isSave} />
                                    <label htmlFor="checkbox">로그인 정보 저장</label>
                                </div>
                                <div onClick={() => {
                                    logout();
                                    dispatch(setUser(null));
                                    router.push('/resetPassword');
                                }}>비밀번호를 잊으셨나요?</div>
                            </div>
                            <button
                                type="submit"
                                onClick={formSubmit}>
                                로그인
                            </button>
                        </form>
                        <div
                            className="social-login-container"
                            onClick={googleLogin}>
                            <Image
                                src={googleIcon}
                                className="google-svg"
                                alt="" />
                            <div>구글 계정으로 로그인</div>
                        </div>
                    </div>
                    <div className="contents-footer">All Cook이 처음이신가요?
                        <span
                            className="underline"
                            onClick={() => router.push('/signUp')}>
                            이메일로 회원가입
                        </span>
                    </div>
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
                    height: 100%;
                    margin-bottom: 80px;
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
                    {/* border: 1px solid #c6c6c6; */}
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
                .password {
                    margin-top: 15px;
                }
                .input-warning {
                    margin-top: 6px;
                    margin-bottom: 12px;
                    margin-left: 2px;
                    font-size: 11.5px;
                    color: #FF0000;
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
                .contents-footer {
                    margin-top: 5px;
                    font-size: 15px;
                }
                .contents-footer span {
                    margin-left: 5px;
                    cursor: pointer;
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