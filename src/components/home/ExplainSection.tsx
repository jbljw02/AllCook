import Link from "next/link";
import Image from "next/image";
import explainImg from "../../../public/svgs/explain.svg";

export default function ExplainSection() {
    return (
        <>
            <Image
                src={explainImg}
                alt={''}
                fetchPriority="auto"
            />
            <div className="explain-detail">
                All Cook을 통해 당신의 주방을 세계의 건강한
                <br /> 레시피로 가득 채워보세요!
            </div>
            <table className="explain-table">
                <thead>
                    <tr>
                        {/* td 태그는 중앙정렬 되어있어 border 길이가 너무 길고 조절이 불가능하기 때문에, span 태그를 추가하여 컨트롤 */}
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
                            이르기까지 다양한 지역을 아우르는 레시피를 <br />
                            제공합니다. 주방에서 세계를 요리해보세요.
                        </td>
                        <td>
                            재료를 검색하면 해당 재료가 들어가는 <br />
                            레시피를 찾아드리고, 원하는 메뉴의 이름을 <br />
                            검색하면 해당 메뉴의 레시피를 제공해드립니다.
                        </td>
                        <td>
                            음식의 레시피 뿐만 아니라 영양성분도 함께 <br />
                            제공합니다. All Cook과 함께 건강한 식생활을 <br />
                            시작해보세요.
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="learn-more">
                <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    href={"/recipe"}>
                    레시피 보기
                </Link>
            </div>
            <style jsx>{`
                .explain-detail {
                    text-align: center;
                    font-size: 30px;
                    font-weight: 300;
                    margin-top: 10px;
                    margin-bottom: 50px;
                    font-weight: 400;
                }
                .explain-table {
                    text-align: center;
                }
                .explain-table td {
                    {
                    /* border-right: 1px solid black; */
                    }
                }
                .explain-table thead tr:nth-child(1) td span {
                    padding: 0 28px;
                    font-size: 22px;
                    border-bottom: 1.5px solid #000000;
                    padding-bottom: 5px;
                    font-weight: 600;
                }
                .explain-table thead tr:nth-child(1) td {
                    padding-bottom: 20px;
                }
                .explain-table thead tr:nth-child(2) {
                    font-size: 20px;
                }
                .explain-table thead tr:nth-child(2) td {
                    padding-bottom: 20px;
                }
                .explain-table tbody td {
                    padding: 0px 25px;
                    font-size: 14px;
                }
                .learn-more {
                    margin-top: 60px;
                    margin-bottom: 15px;
                    padding: 15px 25px;
                    color: #ffffff;
                    border: 1px solid black;
                    background-color: #002312;
                    border-radius: 5px;
                    cursor: pointer;
                }
            `}</style>
        </>
    )
}