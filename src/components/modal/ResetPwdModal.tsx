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
                <div className="pop-up-title-section">
                    비밀번호 분실한 계정의 이메일을 입력해주세요.
                </div>
                <div className="pop-up-subtitle-section">
                    <div
                        className='input-div email'>
                        <svg className="email-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 29" width="30" height="29">
                            <path fill-rule="evenodd" d="M7 7a2.5 2.5 0 0 0-2.5 2.5v9A2.5 2.5 0 0 0 7 21h15a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 22 7H7ZM5.5 9.5C5.5 8.67 6.17 8 7 8h15c.83 0 1.5.67 1.5 1.5v.17l-9 3.79-9-3.8V9.5Zm0 1.25v7.75c0 .83.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5v-7.75l-8.8 3.71-.2.08-.2-.08-8.8-3.7Z"></path>
                        </svg>
                        <input
                            className="email-input"
                            type="text"
                            name="email"
                            placeholder="이메일" />
                    </div>
                </div>
                <div className="pop-up-btn-section">
                    <div
                        className='read-btn'
                    >전송</div>
                </div>
            </div>
        </Modal >
    )
}