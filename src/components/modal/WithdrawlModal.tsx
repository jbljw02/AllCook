import { setUser } from '@/redux/features/userSlice';
import { RootState } from '@/redux/store';
import { deleteUser, getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

interface ModalProps {
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    withdrawlOk: boolean,
    setWithdrawlOk: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function WithdrawlModal({ isModalOpen, withdrawlOk, setIsModalOpen, setWithdrawlOk }: ModalProps) {
    const dispatch = useDispatch();
    const router = useRouter();

    const user = useSelector((state: RootState) => state.user);
   
    // 회원 탈퇴
    const withdrawlUser = useCallback(async () => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
    
        try {
            if (user.name !== '' && currentUser && withdrawlOk) {
                await deleteUser(currentUser);
                dispatch(setUser({
                    name: '',
                    email: '',
                }));
                router.push('/');
            }
        } catch (error) {
            throw error;
        }
    }, [withdrawlOk]);

     // 동의하면 탈퇴를 실행
     useEffect(() => {
        if(withdrawlOk) {
            withdrawlUser();
        }
    }, [withdrawlOk, withdrawlUser]);

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    content: {
                        position: 'absolute',
                        left: '50%',
                        top: '42%',
                        width: 500,
                        height: 165,
                        transform: 'translate(-50%, -50%)',
                    }
                }}>
                <div className="pop-up-container">
                    <div className="pop-up-title-section">
                        정말로 탈퇴하시겠습니까?
                    </div>
                    <div className="pop-up-subtitle-section">
                        탈퇴하실 시 계정은 즉시 삭제 처리되며, 다시 복구하실 수 없습니다.
                    </div>
                    <div className="pop-up-btn-section">
                        <div
                            className="read-btn"
                            onClick={() => {
                                setIsModalOpen(false);
                                setWithdrawlOk(true);
                            }}>
                            확인
                        </div>
                        <div
                            className="close-btn"
                            onClick={() => setIsModalOpen(false)}>
                            취소
                        </div>
                    </div>
                </div>
            </Modal>
            <style jsx>{`
                .pop-up-btn-section {
                    margin-top: 25px;
                }
            `}</style>
        </>
    )
}