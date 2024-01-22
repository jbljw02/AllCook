import bannerImg from '/public/images/banner-img.jpg'
import aboutImg from '/public/images/about-img.jpg'
import Image from 'next/image'
import { Roboto } from 'next/font/google';
import { useEffect, useState } from 'react';
import { makeStore, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setRecomMenu } from '@/redux/features/recomMenuSlice';
import { wrapper } from '../redux/store';
import { GetServerSidePropsContext } from 'next';
import { menu } from '../redux/store';

const roboto = Roboto({
    subsets: ['latin'],
    weight: ["100", "300", "400", "500", "700", "900"],
})

export default function Home() {

    const recomMenu = useSelector((state: RootState) => state.recomMenu);

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
                            환영합니다! 우리는 All Cook, <br />
                            당신의 요리 파트너입니다. <br />
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

                <div className='contents-container'>

                    {/* About 영역을 차지하는 컨테이너 */}
                    <div className='about-container'>
                        <div className={`${roboto.className} about-title`}>About All Cook</div>
                        {/* <Image src={aboutImg} className='about-img' width={700} alt={''} /> */}
                        <table className='about-table'>
                            <thead>
                                <tr>
                                    {/* td 태그는 중앙정렬 되어있어 border 길이가 너무 길고 
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

                    {/* 추천 메뉴 영역을 차지하는 컨테이너 */}
                    <div className='recommend-container'>
                        <div className='recommend-title'>
                            오늘의 추천 메뉴
                        </div>
                        <div className='recommend-subtitle'>
                            All Cook이 추천드리는 메뉴입니다. 오늘은 이 레시피 어떠신가요?
                        </div>
                        <table className='recommend-table'>
                            <tbody>
                                <tr>
                                    {
                                        recomMenu && recomMenu.map((item) => {
                                            return (
                                                <td>
                                                    <Image
                                                        src={`${item.ATT_FILE_NO_MK}`}
                                                        width={200}
                                                        height={200}
                                                        alt={''}
                                                    />
                                                </td>
                                            )

                                        })
                                    }
                                </tr>
                                <tr>
                                    {
                                        recomMenu && recomMenu.map((item) => {
                                            return (
                                                <td>
                                                    <div className='RCP_NM'>{item.RCP_NM}</div>
                                                    <div className='RCP_PAT2'>{item.RCP_PAT2}</div>
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Contact 영역을 차지하는 컨테이너 */}
                    <div className='contact-container'>
                        <span className='contact-left'>
                            <div className='contact-title'>All Cook</div>
                            <div className='span-copyright'>
                                <div className='recipe-source'>
                                    All Cook에서 제공하는 모든 레시피는 식품의약품안전처에서 제공하는 '조리식품의 레시피 DB'를 따릅니다. <br />
                                    본 서비스는 상업적인 이익을 추구하지 않습니다.
                                </div>
                                <div className='copyright-content'>
                                    ©2023 All Cook. All Rights Reserved.
                                </div>
                            </div>
                        </span>
                    </div>

                </div>
            </div>

            <style jsx> {`
                {/* 전체 영역 컨테이너 */}
                .container {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 100%;
                    {/* background-color: #FBF9F1; */}
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

                {/* 헤더 및 배너 컨테이너를 제외한 컨텐츠의 영역 */}
                .contents-container {
                    {/* margin-left: 15%; */}
                    {/* margin-right: 15%; */}
                }

                {/* About 컨테이너 */}
                .about-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    position: relative;
                    margin-bottom: 90px;
                }
                .about-title {
                    text-align: center;
                    margin-top: 80px;
                    margin-bottom: 35px;
                    font-size: 35px;
                    font-weight: 700;
                }
                .about-img {
                    position: absolute;
                    left: 300px;
                }
                .about-table {
                    text-align: center;
                    border-bottom: 1px solid #000000;
                    padding-bottom: 100px;
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

                {/* 추천 메뉴에 대한 컨테이너 */}
                .recommend-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    position: relative;
                    margin-bottom: 100px;
                }
                .recommend-title {
                    margin-bottom: 10px;
                    text-align: center;
                    font-size: 28px;
                    font-weight: 700;
                }
                .recommend-subtitle {
                    margin-bottom: 20px;
                    font-size: 13.5px;
                    color: #5c5c5c;
                }
                .recommend-table {
                    display: flex;
                    flex-direction: column;
                }
                .recommend-table tr td {
                    max-width: 200px;
                    vertical-align: top;
                    align-self: start;
                }
                .recommend-table tr:nth-child(1) td {
                    padding: 0 15px;
                }
                .RCP_NM {
                    text-align: left;
                    padding: 0 15px;
                    font-size: 14.5px;
                    font-weight: 400;
                    word-wrap: break-word;
                    word-break: break-all;
                }
                .RCP_PAT2 {
                    padding: 0 15px;
                    font-size: 12px;
                    color: #5c5c5c;
                }

                {/* Contact 영역의 컨테이너 */}
                .contact-container { 
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    font-size: 14px;
                    background-color: #36755a;
                }
                .contact-left {
                    margin-left: 50px;
                    margin-top: 30px;
                    margin-bottom: 30px;
                    color: #ffffff;
                }
                .contact-title {
                    font-size: 22px;
                    font-weight: 500;
                }
                .span-copyright {
                    font-size: 14px;
                }
                .recipe-source {
                    font-weight: 300;
                    margin-top: 30px;
                    margin-bottom: 30px;
                }
                .copyright-content {
                    font-weight: 200;
                }
            `}</style>
        </>
    )
}


export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res }) => {

    const API_KEY = process.env.API_KEY;

    // api 요청을 보낼 첫번째 파라미터와 두번째 파라미터를 1~30 사이의 랜덤 정수로 생성
    const startParam = Math.floor(Math.random() * 27) + 1;
    const endParam = startParam + 3;

    const response = await fetch(`http://openapi.foodsafetykorea.go.kr/api/
    ${API_KEY}/COOKRCP01/json/${startParam}/${endParam}`, {
        method: "GET",
    });
    const jsonResult = await response.json();
    const result = jsonResult.COOKRCP01.row;

    const menuData = result.map((item: menu) => {
        // 구조 분해 할당 - 각 item에서 필요한 필드들을 추출 선언
        const { RCP_NM, ATT_FILE_NO_MK, INFO_CAR,
            INFO_ENG, INFO_FAT, INFO_NA, INFO_PRO,
            MANUAL01, MANUAL02, MANUAL03, RCP_NA_TIP,
            RCP_PARTS_DTLS, RCP_PAT2 } = item;
        return {
            RCP_NM, ATT_FILE_NO_MK, INFO_CAR,
            INFO_ENG, INFO_FAT, INFO_NA, INFO_PRO,
            MANUAL01, MANUAL02, MANUAL03, RCP_NA_TIP,
            RCP_PARTS_DTLS, RCP_PAT2
        };
    })

    store.dispatch(setRecomMenu(menuData));

    return {
        props: {}
    }
});
