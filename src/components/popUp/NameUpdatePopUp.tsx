import { useEffect, useState } from "react";

type Params = {
    onClose: () => void,
}

export default function NameUpdatePopUp({ onClose }: Params) {
    const [animation, setAnimation] = useState('slide-down');

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimation('slide-up');
            setTimeout(onClose, 500); // slideUp 애니메이션 시간 후에 onClose 호출
        }, 3000); // 3초 후에 팝업 닫기

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <>
            <div className={`pop-up ${animation}`}>정보가 성공적으로 변경되었습니다!</div>
            <style jsx>{`
                .pop-up {
                    position: fixed;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: #002312;
                    color: white;
                    padding: 20px 60px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    font-size: 15px;
                    z-index: 1000;
                }
                .popup.slide-down {
                    animation: slideDown 0.5s forwards;
                }
                .popup.slide-up {
                    animation: slideUp 0.5s forwards;
                }
                @keyframes slideDown {
                    from {
                        top: -50px;
                        opacity: 0;
                    }
                    to {
                        top: 50px;
                        opacity: 1;
                    }
                }
                @keyframes slideUp {
                    from {
                        top: 50px;
                        opacity: 1;
                    }
                    to {
                        top: -50px;
                        opacity: 0;
                    }
                }
            `}</style>
        </>
    )
}