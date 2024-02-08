import Header from "../components/Header"
import Footer from "../components/Footer"
import { useSelector } from "react-redux"
import { Menu, RootState, wrapper } from "@/redux/store";
import { setAllMenu } from "@/redux/features/menuSlice";
import Image from "next/image";

export default function Recipe() {
    const allMenu = useSelector((state: RootState) => state.allMenu);
    const recomMenu = useSelector((state: RootState) => state.allMenu);
    console.log("길이 : ", recomMenu);

    return (
        <>
            <div className="container">
                <Header
                    position="relative"
                    backgroundColor="#ffffff"
                    color="#111111"
                    borderColor="#e8e8e8"
                    svgFill="#000000"
                    lightLogo={false}
                    inputBackgroundColor="#f2f2f2" />
                <div className="top-contents-section">
                    <div></div>
                    <div className="filter-button">
                        <svg className="filter-svg" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 4H14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                            <path d="M4 8H12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                            <path d="M6 12H10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                        </svg>
                        <span>필터</span>
                    </div>
                </div>
                <div className="menu-section">
                    <table className="menu-table">
                        <tbody>
                            {
                                allMenu.length !== undefined &&
                                // new Array를 이용하여 새 배열 생성(allMenu를 5로 나눈 몫만큼 map을 사용하기 위함)
                                // allMenu의 길이를 5로 나누고 소수점이 떨어지지 않을 경우를 대비하여 올림
                                // 그 후에, map은 undefined은 무시하기 때문에 fill을 사용해 모든 요소를 0으로 초기화
                                new Array(Math.ceil(allMenu.length / 5)).fill(0).map((_, index) => {
                                    // 0번 인덱스 = slice(0, 5), 1번 인덱스 = slice(5, 10)... 5개씩 나누어 출력
                                    const items = allMenu.slice(index * 5, index * 5 + 5);
                                    return (
                                        <tr>
                                            {
                                                items.map(item => (
                                                    <td>
                                                        <div className='td-content'>
                                                            <Image
                                                                src={`${item.ATT_FILE_NO_MK}`}
                                                                style={{ borderRadius: 8 }}
                                                                width={220}
                                                                height={220}
                                                                alt={''}
                                                            />
                                                            <div className='RCP_NM'>{item.RCP_NM}</div>
                                                            <div className='RCP_PAT2'>{item.RCP_PAT2}</div>
                                                        </div>
                                                    </td>
                                                ))}
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <Footer />
            </div>
            <style jsx> {`
               .top-contents-section {
                    display: flex;
                    justify-content: space-between;
                    padding: 0 10%;
               }
               .filter-button {
                    display: flex;
                    margin-top: 20px;
                    padding: 4px 12px;
                    border: 1px solid #e8e8e8;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: border-color 0.3s ease;
               }
               .filter-button:hover {
                    border-color: rgb(130, 130, 130);
               }
               .filter-svg {
                    width: 16px;
                    margin-right: 5px;
                    margin-top: 1px;
               }
               .filter-button span {
                    font-size: 14px;
                    font-weight: 500;
               }    
               .menu-section {
                    display: flex;
                    justify-content: center;
                    margin-top: 30px;
                    padding: 0 10%;
               }
               .menu-table {
                    display: flex;
                    flex-direction: column;
                    border-collapse: separate;
                    border-spacing: 0 25px;
               }
               .menu-table tr td {
                    max-width: 220px;
                    vertical-align: top;
                    align-self: start;
                    transition: transform 0.3s ease;
                    padding: 0 9px;
               }
               .menu-table tr td:hover {
                    transform: scale(1.05);
               }
               .td-content {
                cursor: pointer;
               }
               .RCP_NM {
                    text-align: left;
                    font-size: 14.5px;
                    font-weight: 400;
                    word-wrap: break-word;
                    word-break: break-all;
                }
                .RCP_PAT2 {
                    font-size: 12px;
                    color: #5c5c5c;
                }
            `}</style>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
    const API_KEY = process.env.API_KEY;

    const allMenu = store.getState().allMenu;

    // 홈 화면을 통해 접근하지 않을 경우, allMenu가 undefined 상태이기 때문에 업데이트
    if (allMenu.length === undefined) {
        const startParam = 1;
        const endParam = 1000;

        const response = await fetch(`http://openapi.foodsafetykorea.go.kr/api/
        ${API_KEY}/COOKRCP01/json/${startParam}/${endParam}`, {
            method: "GET",
        });
        const jsonResult = await response.json();
        const result = jsonResult.COOKRCP01.row;

        // 포함하지 않을 문자열을 필터링하는 정규식
        // 미완된 음식의 이미지나, 워터마크가 있는 이미지를 필터링하기 위함
        const regex = /(uploadimg\/(2014|2015|2019|2020|2021|2023)|common\/ecmFileView\.do\?)/;

        const menuData = result.filter((item: Menu) => {
            const match = (item.ATT_FILE_NO_MK).match(regex);
            return match === null;
        });

        store.dispatch(setAllMenu(menuData));
    }

    return {
        props: {}
    }
})