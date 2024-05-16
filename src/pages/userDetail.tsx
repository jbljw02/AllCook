import Seo from "@/components/Seo";
import Header from "@/components/header/Header";
import HeaderOnContents from "@/components/header/HeaderOnContents";
import FormInput from "@/components/input/FormInput";
import WithdrawlModal from "@/components/modal/WithdrawlModal";
import { admin } from "@/firebase/firebaseAdmin";
import { setUser } from "@/redux/features/userSlice";
import { RootState } from "@/redux/store";
import logout from "@/utils/auth/logout";
import { getAuth, updateProfile } from "firebase/auth";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export type UserForm = {
    name: string,
    submitted: boolean,
}

export default function UserDetail() {
    const dispatch = useDispatch();
    const router = useRouter();

    const scrollPassContent = useSelector((state: RootState) => state.scrollPassContent);
    const headerSlide = useSelector((state: RootState) => state.headerSlide);
    
    const user = useSelector((state: RootState) => state.user);

    const [formData, setFormData] = useState<UserForm>({
        name: '',
        submitted: false,
    })
    const [nameFocusStyle, setNameFocusStyle] = useState({
        stroke: '#dadada',
        borderColor: '',
    })

    const formChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    // input에 포커스가 있을 때와 없을 때의 속성을 구분
    const inputFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'name') {
            setNameFocusStyle({ stroke: '#111111', borderColor: '#111111' });
        }
    }
    const inputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'name') {
            setNameFocusStyle({ stroke: '#dadada', borderColor: '' });
        }
    }

    // 유저 이름을 변경
    const updateUserName = async (event: { preventDefault: () => void; }) => {
        event.preventDefault(); // form의 기본 동작을 막음(조건이 만족해야 전송되도록)

        setFormData({
            ...formData,
            submitted: true,
        });

        const auth = getAuth();
        const currentUser = auth.currentUser;

        try {
            if (formData.name !== '') {
                if (currentUser) {
                    await updateProfile(currentUser, {
                        displayName: formData.name,
                    });
                    window.location.reload();
                }
            }
        } catch (error) {
            throw error;
        }
    }

    const signOut = () => {
        logout();
        dispatch(setUser({
            name: '',
            email: '',
        }));
        router.push('/');
    }

    const [withdrawlModal, setWithdrawlModal] = useState<boolean>(false);
    const [withdrawlOk, setWithdrawlOk] = useState<boolean>(false);

    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            name: user.name,
        }));
    }, [user.name]);

    return (
        <>
        <Seo title="회원 정보"  />
            <div className="container">
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
                <div className="user-detail-section">
                    <svg width="90" data-bbox="0 0 22 22" data-type="shape" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                        <path fill='#111111'
                            d="M25 48.077c-5.924 0-11.31-2.252-15.396-5.921 2.254-5.362 7.492-8.267 15.373-8.267 7.889 0 13.139 3.044 15.408 8.418-4.084 3.659-9.471 5.77-15.385 5.77m.278-35.3c4.927 0 8.611 3.812 8.611 8.878 0 5.21-3.875 9.456-8.611 9.456s-8.611-4.246-8.611-9.456c0-5.066 3.684-8.878 8.611-8.878M25 0C11.193 0 0 11.193 0 25c0 .915.056 1.816.152 2.705.032.295.091.581.133.873.085.589.173 1.176.298 1.751.073.338.169.665.256.997.135.515.273 1.027.439 1.529.114.342.243.675.37 1.01.18.476.369.945.577 1.406.149.331.308.657.472.98.225.446.463.883.714 1.313.182.312.365.619.56.922.272.423.56.832.856 1.237.207.284.41.568.629.841.325.408.671.796 1.02 1.182.22.244.432.494.662.728.405.415.833.801 1.265 1.186.173.154.329.325.507.475l.004-.011A24.886 24.886 0 0 0 25 50a24.881 24.881 0 0 0 16.069-5.861.126.126 0 0 1 .003.01c.172-.144.324-.309.49-.458.442-.392.88-.787 1.293-1.209.228-.232.437-.479.655-.72.352-.389.701-.78 1.028-1.191.218-.272.421-.556.627-.838.297-.405.587-.816.859-1.24a26.104 26.104 0 0 0 1.748-3.216c.208-.461.398-.93.579-1.406.127-.336.256-.669.369-1.012.167-.502.305-1.014.44-1.53.087-.332.183-.659.256-.996.126-.576.214-1.164.299-1.754.042-.292.101-.577.133-.872.095-.89.152-1.791.152-2.707C50 11.193 38.807 0 25 0"></path>
                    </svg>
                    <div className="input-container">
                        <form>
                            <div
                                className="input-div name"
                                id={`${formData.submitted && formData.name === '' ?
                                    'warning-border' :
                                    ''}`}
                                style={{ borderColor: nameFocusStyle.borderColor }}>
                                <svg className="name-svg" xmlns="http://www.w3.org/2000/svg" width="23px" height="20px" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke={nameFocusStyle.stroke} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke={nameFocusStyle.stroke} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <FormInput
                                    type="text"
                                    name="name"
                                    formData={formData}
                                    formChange={formChange}
                                    value={formData.name}
                                    inputFocus={inputFocus}
                                    inputBlur={inputBlur}
                                    placeholder="이름(닉네임)"
                                />
                            </div>
                            {
                                (formData.submitted && formData.name === '') &&
                                <div className="input-warning">변경할 이름을 입력해주세요</div>
                            }
                            <div className="input-div email email-div">
                                <svg className="email-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 29" width="30" height="29">
                                    <path fill='#dadada' fillRule="evenodd" d="M7 7a2.5 2.5 0 0 0-2.5 2.5v9A2.5 2.5 0 0 0 7 21h15a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 22 7H7ZM5.5 9.5C5.5 8.67 6.17 8 7 8h15c.83 0 1.5.67 1.5 1.5v.17l-9 3.79-9-3.8V9.5Zm0 1.25v7.75c0 .83.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5v-7.75l-8.8 3.71-.2.08-.2-.08-8.8-3.7Z"></path>
                                </svg>
                                <input
                                    className="email"
                                    type="text"
                                    name="email"
                                    value={user.email}
                                    readOnly
                                />
                            </div>
                            <button
                                className="modify"
                                onClick={updateUserName}
                                type="submit">
                                변경하기
                            </button>
                        </form>
                    </div>
                    <div className="under-button-section">
                        <WithdrawlModal
                            isModalOpen={withdrawlModal}
                            setIsModalOpen={setWithdrawlModal}
                            withdrawlOk={withdrawlOk}
                            setWithdrawlOk={setWithdrawlOk}
                        />
                        <button
                            className="withdrawl"
                            onClick={() => setWithdrawlModal(true)}>
                            회원 탈퇴
                        </button>
                        <button
                            className="logout"
                            onClick={signOut}>
                            로그아웃
                        </button>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .user-detail-section {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                    margin-bottom: 150px;
                    color: #111111;
                }
                .input-container {
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
                    margin-bottom: 15px;
                }
                .name {
                    margin-bottom: 0px;
                }
                .input-warning {
                    margin-top: 6px;
                    margin-bottom: 12px;
                    margin-left: 2px;
                    font-size: 11.5px;
                    color: #FF0000;
                }
                input {
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
                .email-div {
                    margin-top: 15px;
                }
                .email {
                    background-color: #ebebeb !important;
                    color: #a8a69d;
                }
                button {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 16px 30px;
                    border-radius: 10px;
                    cursor: pointer;
                    font-size: 16px;
                }
                .modify {
                    border: 1px solid transparent;
                    background-color: #002312;
                    color: #fff;
                    margin-top: 20px;
                }
                .under-button-section {
                    display: flex;
                    flex-direction: row;
                    width: 510px;
                }
                .withdrawl {
                    border: 1px solid transparent;
                    background-color: #f2f2f2;
                    color: #5c5c5c;
                    transition: text-decoration 0.2s ease;
                }
                .withdrawl:hover {
                    text-decoration: underline;
                }
                .logout {
                    border: 1px solid #e8e8e8;
                    background-color: #ffffff;
                    margin-left: 40px;
                    transition: border-color 0.2s ease;
                }
                .logout:hover{
                    border-color: rgb(130, 130, 130);
                }
            `}</style>
        </>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    try {
        const cookies = parseCookies(context);
        const authToken = cookies.authToken;

        // 인증 완료 시 현재 페이지를 보여줌
        await admin.auth().verifyIdToken(authToken);
        return {
            props: {}
        };
    } catch (error) {
        // 인증 실패 시 로그인 화면으로 이동
        return {
            redirect: {
                destination: '/signIn',
                parmanent: false,
            }
        }
    }
}