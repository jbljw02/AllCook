import { Roboto } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {

    return (
        <>
            <div className='container'>
                <Header />
                {/* about 영역을 차지하는 컨테이너 */}
                <div className='about-container'>
                    <div className='about-title'>About All Cook</div>
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
                <Footer />
            </div>
            <style jsx>{`
                {/* About 컨테이너 */}
                .about-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    position: relative;
                    margin-top: 50px;
                    margin-bottom: 120px;
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
                    padding-bottom: 120px;
                    border-bottom: 1px solid #000000;
                }
                .about-table td {
                    {/* border-right: 1px solid black; */}
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