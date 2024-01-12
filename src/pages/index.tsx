import bannerImg from '../images/banner-img.jpg'
import Image from 'next/image'
import { Roboto } from 'next/font/google';

const roboto = Roboto({
    subsets: ['latin'],
    weight: ["300"],
})

export default function Home() {
    return (
        <>
            {/* 홈 화면의 전체 영역을 차지하는 컨테이너  */}
            <div className='container'>
                {/* 헤더부터 이미지 배너까지의 영역을 차지하는 컨테이너 */}
                <div className='header-container'>
                    {/* 헤더 영역 */}
                    <header className='header'>
                        <span className={`${roboto.className} title`}>AllCook</span>
                        <span className='nav'>
                            <span className={`${roboto.className} home`}>Home</span>
                            <span className={`${roboto.className} about`}>About</span>
                            <span className={`${roboto.className} recipe`}>Recipe</span>
                            <span className={`${roboto.className} contact`}>Contact</span>
                        </span>
                    </header>
                    <div className='search-section'>
                        <div>당신을 위한 1,124개의 레시피</div>
                        <div className='input-container'>
                            <input className='search-input' placeholder='메뉴, 레시피로 검색' />
                            <svg className="img-search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="23" height="23">
                                <path fill="currentColor" d="M3.5 8a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM8 2a6 6 0 1 0 3.65 10.76l3.58 3.58 1.06-1.06-3.57-3.57A6 6 0 0 0 8 2Z"></path></svg>
                        </div>
                    </div>
                    {/* 홈 화면의 배너 및 이미지 컨테이너 */}
                    <Image src={bannerImg} alt={''} width={1000} height={200} layout="responsive" />
                </div>

                {/* About 영역을 차지하는 컨테이너 */}
                <div className='about-container'>
        
                </div>
            </div>

            <style jsx> {`
                .header-container {
                    display: flex;
                    flex-direction: column;
                }
                .header {
                    position: fixed;
                    width: 100%;
                    height: 80px;
                    color: #ffffff;
                }
                .title {
                    font-size: 35px;
                    padding-top: 30px;
                    padding-left: 60px;
                    padding-bottom: 20px;
                    display: inline-block;
                    font-weight: bold;
                    cursor: pointer;
                }
                .nav {
                    position: relative;
                    float: right;
                    padding-top: 30px;
                    margin-right: 35px;
                    font-size: 20px;
                }
                .nav span {
                    margin-right: 20px;
                    cursor: pointer;
                }
                .search-section {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    position: absolute;
                    top: 32%;
                    left: 50%;
                    {/* left: 50%만 하면 가장 좌측기준 중앙으로 위치하기 때문에, 50%만큼 좌측으로 이동 */}
                    transform: translateX(-50%);  
                }
                .search-section div:nth-child(1) {
                    color: #ffffff;
                    font-size: 55px;
                }
                .input-container {
                    display: flex;
                    justify-content: center;
                    padding-top: 20px;
                }
                .search-input {
                    outline: none;
                    width: 600px;
                    height: 40px;
                    font-size: 18px;
                    padding-left: 15px;
                }
                .img-search {
                    position: relative;
                    top: 10px;
                    right: 35px;
                    color: rgb(62, 60, 60);
                    cursor: pointer;
                }
            `}</style>
        </>
    )
}
