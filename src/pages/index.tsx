import bannerImg from '../images/banner-img.jpg'
import aboutImg from '../images/about-img.jpg'
import Image from 'next/image'
import { Roboto } from 'next/font/google';
import { useState } from 'react';

const roboto = Roboto({
    subsets: ['latin'],
    weight: ["100", "300", "400", "500", "700", "900"],
})

export default function Home() {

    const temp = useState();
    console.log(temp);

    return (
        <>
            {/* 홈 화면의 전체 영역을 차지하는 컨테이너  */}
            <div className='container'>
                {/* 헤더부터 이미지 배너까지의 영역을 차지하는 컨테이너 */}
                <div className='header-container'>
                    {/* 헤더 영역 */}
                    <header className='header'>
                        <span className={`${roboto.className} title`}>All Cook</span>
                        <span className='nav'>
                            <span className={`${roboto.className} home`}>Home</span>
                            <span className={`${roboto.className} about`}>About</span>
                            <span className={`${roboto.className} recipe`}>Recipe</span>
                            <span className={`${roboto.className} contact`}>Contact</span>
                        </span>
                    </header>
                    {/* 배너 문구와 검색창을 차지하는 컨테이너 */}
                    <div className='banner-container'>
                        <div className='welcome-section'>
                            환영합니다! 우리는 All Cook, <br /> 당신의 요리 파트너입니다. <br />
                        </div>
                        <div className='search-section'>
                            <div>당신을 위한 1,124개의 레시피</div>
                            <div className='input-container'>
                                <input className='search-input' placeholder='메뉴, 재료로 검색' />
                                <svg className="img-search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="21" height="21">
                                    <path fill="currentColor" d="M3.5 8a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM8 2a6 6 0 1 0 3.65 10.76l3.58 3.58 1.06-1.06-3.57-3.57A6 6 0 0 0 8 2Z"></path></svg>
                            </div>
                        </div>
                    </div>
                    {/* 홈 화면의 배너 및 이미지 컨테이너 */}
                    <Image src={bannerImg} alt={''} layout="responsive" />
                </div>

                {/* About 영역을 차지하는 컨테이너 */}
                <div className='about-container'>
                    <div className={`${roboto.className} about-title`}>About All Cook</div>
                    {/* <Image src={aboutImg} className='about-img' width={700} alt={''} /> */}
                    <table className='about-table'>
                        <thead>
                            <tr>
                                {/* td 태그는 중앙정렬 돼있기 때문에 border 길이가 너무 길고 
                                조절이 불가능하기 때문에, span 태그를 추가하여 컨트롤 */}
                                <td>
                                    <span>01</span>
                                </td>
                                <td>
                                    <span>02</span>
                                </td>
                                <td>
                                    <span>03</span>
                                </td>
                            </tr>
                            <tr>
                                <td>다양한 레시피</td>
                                <td>편리한 검색</td>
                                <td>영양성분 제공</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    All Cook은 한식은 물론, 일식, 양식, 중식에 <br />
                                    이르기까지 1,000개 이상의 다양한 레시피를 <br />
                                    제공합니다. 다양한 문화의 음식을 요리해보세요.
                                </td>
                                <td>
                                    재료를 검색하면 해당 재료가 들어가는 <br />
                                    레시피를 찾아드리고, 원하는 메뉴의 이름을 <br />
                                    검색하면 해당 메뉴의 레시피를 제공해드립니다.
                                </td>
                                <td>
                                    음식의 레시피 뿐만 아니라 영양성분도 함께 <br />
                                    제공합니다.
                                    All Cook과 함께 건강한 식생활을 <br />
                                    시작해보세요.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <style jsx> {`
                .container {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 100vh;
                }

                {/* 헤더 컨테이너 */}
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
                    font-size: 30px;
                    padding-top: 25px;
                    padding-left: 50px;
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
                    margin-right: 30px;
                    cursor: pointer;
                }
                .nav span:nth-child(4) {
                    margin-right: 15px;
                }
                .banner-container {
                    position: absolute;
                    top: 31%;
                    left: 10%;
                }
                .welcome-section {
                    color: #ffffff;
                    font-size: 50px;
                    {/* font-weight: bold; */}
                }
                .search-section {
                    display: flex;
                    flex-direction: column;
                    margin-top: 18px;
                    margin-left: 7px
                }
                .search-section div:nth-child(1) {
                    color: #ffffff;
                    font-size: 18px;
                    font-weight: 300;
                }
                .input-container {
                    display: flex;
                    padding-top: 18px;
                    border: none;
                }
                .search-input {
                    outline: none;
                    width: 300px;
                    height: 30px;
                    font-size: 14px;
                    padding-left: 12px;
                    padding-top: 3px;
                    padding-bottom: 3px;
                    border-radius: 5px;
                    border: none;
                }
                .img-search {
                    position: relative;
                    top: 7px;
                    right: 33px;
                    color: rgb(76, 75, 75);
                    cursor: pointer;
                }

                {/* About 컨테이너 */}
                .about-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    background-color: rgb(255, 255, 255);
                    position: relative;
                }
                .about-title {
                    text-align: center;
                    margin-top: 80px;
                    margin-bottom: 50px;
                    font-size: 45px;
                    font-weight: 700;
                }
                .about-img {
                    position: absolute;
                    left: 300px;
                }
                .about-table {
                    text-align: center;
                    margin-bottom: 60px;
                }
                .about-table thead tr:nth-child(1) td span {
                    padding: 0 28px;
                    font-size: 22px;
                    border-bottom: 1.5px solid #000000;
                    padding-bottom: 5px;
                    font-weight: 600;
                }
                .about-table thead tr:nth-child(1) td {
                    padding-bottom: 20px;
                }
                .about-table thead tr:nth-child(2) {
                    font-size: 20px;
                }
                .about-table thead tr:nth-child(2) td {
                    padding-bottom: 20px;
                }
                .about-table tbody td {
                    padding: 0px 25px;
                    font-size: 14px;
                }
            `}</style>
        </>
    )
}

export async function getStaticProps() {
    const response = await fetch('http://localhost:3000/home/api/recipe', {
        method: 'GET',
    });

    const results = await response.json()
    console.log("결과 : ", results);

    return {
        props: {
            results
        }
    }
}