import { useRouter } from 'next/router';
import Modal from 'react-modal';

interface ModalProps {
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FalseModal({ isModalOpen, setIsModalOpen }: ModalProps) {
    const router = useRouter();
    return (
        <Modal
            isOpen={isModalOpen}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                },
                content: {
                    position: 'absolute',
                    left: '50%',
                    top: '45%',
                    width: 500,
                    height: 185,
                    transform: 'translate(-50%, -50%)',
                }
            }}>
            <div className="pop-up-container">
                <div className="pop-up-title-section">
                    로그인 실패
                </div>
                <div className="pop-up-subtitle-section">
                    원할한 문의 처리를 위해 개인정보 처리방침을 확인하시고, 동의해 주시기 바랍니다.
                </div>
                <div className="pop-up-btn-section">
                    <div
                        className="read-btn"
                        onClick={() => {
                            setIsModalOpen(false);
                            router.push('/signUp')
                        }}>회원가입</div>
                    <div
                        className="close-btn"
                        onClick={() => setIsModalOpen(false)
                        }>닫기</div>
                </div>
            </div>
        </Modal>
    )
}