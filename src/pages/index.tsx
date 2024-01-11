import bannerImg from '../images/banner-img.jpg'
import Image from 'next/image'
import { Shadows_Into_Light } from 'next/font/google';

const sil = Shadows_Into_Light({
    subsets: ['latin'],
    weight: ["400"],
})

export default function Home() {
    return (
        <>
            {/* 홈 화면의 전체 영역을 차지하는 컨테이너  */}
            <div className='home-container'>
                <header className='header'>
                    <span className={`${sil.className} title`}>AllCook</span>
                </header>
                {/* 홈 화면의 배너 및 이미지 컨테이너 */}
                <Image src={bannerImg} alt={''} layout="responsive" />
            </div>
            <style jsx> {`
                .home-container {
                    display: flex;
                    flex-direction: column;
                    background-color: rgb(248, 241, 230);
                    height: 100%;
                }
                .header {
                    width: 100%;
                    height: 80px;
                }
                .title {
                    font-size: 40px;
                    margin-left: 20px;
                }
            `}</style>
        </>
    )
}
