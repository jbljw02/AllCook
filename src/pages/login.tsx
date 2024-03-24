import kakaoLogin from "../../public/images/kakao_login.png"
import Image from "next/image";
import googleLogin from '../../public/svgs/googleLogin.svg';

export default function login() {
    return (
        <>
            <div className="container">
                <div className="header">
                    <span className="back-svg" >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="25" height="25" fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-width="1.2" d="M17 22.5 6.85 12.35a.5.5 0 0 1 0-.7L17 1.5"></path>
                        </svg>
                    </span>
                    <span className="close-svg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="25" height="25"><path stroke="currentColor" stroke-width="1.2" d="m1.5 1.5 21 21m0-21-21 21"></path>
                        </svg>
                    </span>
                </div>
                <div className="contents-container">
                    <div className="title-container">
                        <div className="title">로그인</div>
                        <div className="subtitle">All Cook에 오신 것을 환영합니다!</div>
                    </div>
                    <div className="login-container">
                        <form>
                            <div className="email-div">
                                <svg className="email-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 29" width="30" height="29">
                                    <path fill="#dadada" fill-rule="evenodd" d="M7 7a2.5 2.5 0 0 0-2.5 2.5v9A2.5 2.5 0 0 0 7 21h15a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 22 7H7ZM5.5 9.5C5.5 8.67 6.17 8 7 8h15c.83 0 1.5.67 1.5 1.5v.17l-9 3.79-9-3.8V9.5Zm0 1.25v7.75c0 .83.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5v-7.75l-8.8 3.71-.2.08-.2-.08-8.8-3.7Z"></path>
                                </svg>
                                <input className="email-input" type="text" placeholder="이메일"></input>
                            </div>
                            <div className="password-div">
                                <svg className="password-svg" xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 30 29" fill="none">
                                    <rect x="3" y="11" width="18" height="11" rx="2" stroke="#dadada" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M7 10.9999V6.99988C7 4.23845 9.23858 1.99988 12 1.99988V1.99988C14.7614 1.99988 17 4.23845 17 6.99988V10.9999" stroke="#dadada" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <input className="password-input" type="password" placeholder="비밀번호"></input>
                            </div>
                            <div className="login-footer-div">
                                <div className="checkbox-div">
                                    <input type="checkbox" />
                                    <span>로그인 정보 저장</span>
                                </div>
                                <div>비밀번호를 잊으셨나요?</div>
                            </div>
                            <button type="submit">로그인</button>
                        </form>
                        <div className="social-login-container">
                            <Image src={googleLogin} className="google-svg" alt="" />
                            <Image width={280} height={44} src={kakaoLogin} alt={''} />
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .container {
                    justify-content: flex-start !important;
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 35px;
                }
                .back-svg {
                    position: relative;
                    left: 40px;
                    cursor: pointer;
                }
                .close-svg {
                    position: relative;
                    right: 40px;
                    cursor: pointer;
                }
                .contents-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    margin-top: 110px;
                }
                .title-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .title {
                    font-size: 25px;
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
                    width: 570px;
                    padding: 40px 10px 40px 10px;
                    margin-top: 30px;
                    border: 1px solid #c6c6c6;
                    border-radius: 5px;
                }
                form {
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding-bottom: 40px;
                    border-bottom: 1px solid #a8a8a8;
                    width: 490px;
                }
                .email-div, .password-div {
                    display: flex;
                    flex-direction: row;
                    border: 1px solid #dadada;
                    border-radius: 5px;
                }
                .email-div {
                    margin-bottom: 15px;
                }
                .email-svg {
                    position: relative;
                    top: 7px;
                    left: 5px;
                }
                .password-svg {
                    position: relative;
                    top: 10px;
                    left: 9.5px;
                }
                .email-input, .password-input {
                    outline: none;
                    width: 100%;
                    height: 38px;
                    font-size: 14px;
                    padding-left: 12px;
                    padding-top: 3px;
                    padding-bottom: 3px;
                    border-radius: 10px;
                    border: none;
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
                    margin-top: 4px;
                }
                .checkbox-div span {
                    margin-left: 3px;
                }
                button {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    padding: 15px 30px;
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
                    justify-content: space-between;
                    width: 515px;
                    margin-top: 40px;
                    margin-right: 16px;
                }
                .social-login-container div {
                    padding: 12px 45px;
                    color: #111111;
                    border: 1px solid #9a9a9a;
                    border-radius: 10px;
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