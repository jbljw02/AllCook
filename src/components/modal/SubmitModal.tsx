import Modal from 'react-modal';

interface modalProps {
    isSubmitted: boolean,
    setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function SubmitModal({ isSubmitted, setIsSubmitted }: modalProps) {

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
                    height: 185,
                    transform: 'translate(-50%, -50%)',
                }
            }}
        >
            <div className="pop-up-container">
                {
                    <div className="pop-up-title-section">
                        문의사항이 전송 완료되었습니다!
                    </div>
                }
                <div className="pop-up-subtitle-section">
                    귀하의 소중한 의견 감사드리며, 작성하신 이메일을 통해 문의사항에 대한 답변을 드릴테니 조금만 기다려 주세요.
                </div>
                <div className="pop-up-btn-section">
                    <div
                        className="read-btn"
                        onClick={() => setIsSubmitted(false)}>확인</div>
                </div>
            </div>
        </Modal>
    )
}