import Modal from 'react-modal';

interface ModalProps {
    isCheckedModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsCheckedModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PiNoticeModal({ isCheckedModalOpen, setIsModalOpen, setIsCheckedModalOpen }: ModalProps) {

    return (
        <Modal
            isOpen={isCheckedModalOpen}
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
                    <span>개인정보 처리방침</span>에 대한 동의가 필요합니다.
                </div>
                <div className="pop-up-subtitle-section">
                    원할한 문의 처리를 위해 개인정보 처리방침을 확인하시고, 동의해 주시기 바랍니다.
                </div>
                <div className="pop-up-btn-section">
                    <div
                        className="read-btn"
                        onClick={() => {
                            setIsModalOpen(true);
                            setIsCheckedModalOpen(false);
                        }}>읽기</div>
                    <div
                        className="close-btn"
                        onClick={() => setIsCheckedModalOpen(false)
                        }>닫기</div>
                </div>
            </div>
        </Modal>
    )
}