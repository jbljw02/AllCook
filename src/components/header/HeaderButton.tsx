import Image from "next/image";
import backSvg from '../../../public/svgs/backBtn.svg';
import closeSvg from '../../../public/svgs/closeBtn.svg';
import { useRouter } from "next/router";

export default function HeaderButton() {
    const router = useRouter();
    return (
        <>
            <div className="header-btn">
                <span className="back-svg" onClick={router.back}>
                    <Image
                        src={backSvg}
                        alt=""
                        fetchPriority="auto"
                    />
                </span>
                <span className="close-svg" onClick={() => router.push('/')}>
                    <Image
                        src={closeSvg}
                        alt=""
                        fetchPriority="auto"
                    />
                </span>
            </div>
            <style jsx>{`
                .header-btn {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 30px;
                }
            `}</style>
        </>
    )
}