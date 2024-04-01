import Modal from 'react-modal';
import { auth } from "@/firebase/firebasedb";
import { sendEmailVerification, updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/features/userSlice';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface modalProps {
    isSubmitted: boolean,
    setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>,
    name?: string,
}

export default function EmailVerifyModal({ isSubmitted, setIsSubmitted, name }: modalProps) {
    const dispatch = useDispatch();
    const router = useRouter();

    const user = auth.currentUser;

    useEffect(() => {
        if (name !== undefined && user) {
            // 계정의 이름을 업데이트하고, state도 그와 동일하게 업데이트
            updateProfile(user, {
                displayName: name,
                photoURL: ""
            })
            dispatch(setUser(user.displayName));
        }
    }, [name, user])

    const [isVerify, setIsVerify] = useState<boolean>(true); // 이메일이 인증됐는지
    const [isVibrate, setIsVibrate] = useState<boolean>(false); // 진동 효과를 줄지

    // 사용자의 이메일 인증 여부를 확인하고, 그에 따라 계정을 활성화할지 결정
    const accountActivate = async () => {
        if (user) {
            // 사용자 상태 갱신
            user.reload().then(async () => {
                // 사용자의 이메일 인증이 완료된 경우
                if (user.emailVerified) {
                    console.log("이메일 인증 성공");
                    setIsSubmitted(false);
                    router.push('/');
                }
                else {
                    console.log("이메일 인증 아직 X");
                    setIsVerify(false);

                    // 이메일이 인증되지 않은 상태에서 '확인' 버튼을 클릭하면 진동 효과
                    setIsVibrate(true);
                    setTimeout(() => {
                        setIsVibrate(false);
                    }, 1000)
                }
            });
        }
    }

    const resendMail = async () => {
        try {
            if (user) {
                await sendEmailVerification(user);
                console.log("이메일 재전송 완료");
            }
        }
        catch (error) {
            console.log("이메일 재전송 실패");
        }
    }

    return (
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
                    width: 500,
                    height: 205,
                    transform: 'translate(-50%, -50%)',
                }
            }}
        >
            <div className="pop-up-container">
                {
                    isVerify ?
                        <div className="pop-up-title-section">
                            이메일로 인증 메일을 전송했습니다.
                        </div> :
                        <div className="pop-up-title-section" style={{ color: '#FF0000' }}>
                            인증이 아직 완료되지 않았습니다!
                        </div>
                }
                {
                    isVerify ?
                        <div className="pop-up-subtitle-section">
                            메일 본문에 있는 인증 절차를 마치시면 계정이 활성화됩니다. <br />
                            완료하셨다면 '확인'을 클릭해주시고, 메일을 받지 못하셨다면 '재전송'을 클릭해주세요.
                        </div> :
                        <div className='pop-up-subtitle-section' style={{ color: '#111111' }}>
                            메일 본문에 있는 인증 절차를 마치시면 계정이 활성화됩니다. <br />
                            메일을 받지 못하셨다면 '재전송'을 클릭해주시고, 그럼에도 받지 못하셨다면 스팸 메일함을 확인해주세요.
                        </div>
                }
                <div className="pop-up-btn-section">
                    <div
                        className={`${isVibrate ? 'read-btn vibrate' : 'read-btn'}`}
                        onClick={accountActivate}>확인</div>
                    <div
                        className="close-btn"
                        onClick={resendMail}>재전송</div>
                </div>
            </div>
        </Modal>
    )
}