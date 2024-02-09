import Header from "../components/Header"
import Footer from "../components/Footer"
import { useSelector } from "react-redux"
import { Menu, RootState, wrapper } from "@/redux/store";
import { setAllMenu } from "@/redux/features/menuSlice";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Recipe() {
    const allMenu = useSelector((state: RootState) => state.allMenu);
    const recomMenu = useSelector((state: RootState) => state.allMenu);

    const [recomHashTags, setRecomHashTags] = useState<string[]>();

    // 피셔-예이츠 셔플 알고리즘
    // 배열의 마지막 요소부터 처음 요소까지 반복, 각 반복에서 해당 요소와 그 이전의 무작위 위치의 요소를 교환
    const shuffle = (array: string[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            // 0 이상 i(현재 요소의 인덱스) 이하의 무작위 정수를 얻음
            const j = Math.floor(Math.random() * (i + 1));
            // 요소의 위치를 교환
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // allMenu가 업데이트 될 때, 해시태그를 업데이트함
    useEffect(() => {
        const hastTags = allMenu.map((item) => item.HASH_TAG);
        const uniqeHashTags = [...new Set(hastTags)];  // 중복 제거
        const nonEmptyHashTags = uniqeHashTags.filter(item => item.trim() !== '');  // 공백 문자를 제외하여 반환
        const fixedSideTags = (shuffle(nonEmptyHashTags)).slice(0, 8);
        setRecomHashTags(fixedSideTags);
    }, [allMenu])

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
                <div className="contents-container">
                    <div className="top-contents-section">
                        <div className="sort-button">
                            <span>가나다순</span>
                            <svg className="sort-svg" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m9 4.5-3 3-3-3" stroke="currentColor" stroke-linecap="round"></path>
                            </svg>
                        </div>
                        <div className="hash-tag-section">
                            {
                                recomHashTags && recomHashTags.map((item) => {
                                    return (
                                        <span>{item}</span>
                                    )
                                })
                            }
                        </div>
                        <div className="filter-button">
                            <svg className="filter-svg" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 4H14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                                <path d="M4 8H12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                                <path d="M6 12H10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                            </svg>
                            <span>상세검색</span>
                        </div>
                    </div>
                    {/* <div className="contents-container">
                    <div className="filter-section">
                        <div id="filter-title">
                            <svg className="filter-svg" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 4H14" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
                                <path d="M4 8H12" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
                                <path d="M6 12H10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
                            </svg>
                            <span>상세 검색</span>
                        </div>
                        <div>
                            <span>음식의 종류</span>
                            <svg className="plus-svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M11,5 L10.999,10 L16,10 L16,11 L11,11 L11,16 L10,16 L9.999,11 L5,11 L5,10 L10,9.999 L10,5 L11,5 Z"></path>
                            </svg>
                        </div>
                        <div>
                            <span>요리 방법</span>
                            <svg className="plus-svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M11,5 L10.999,10 L16,10 L16,11 L11,11 L11,16 L10,16 L9.999,11 L5,11 L5,10 L10,9.999 L10,5 L11,5 Z"></path>
                            </svg>
                        </div>
                        <div>
                            <span>영양성분 포함량</span>
                            <svg className="plus-svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M11,5 L10.999,10 L16,10 L16,11 L11,11 L11,16 L10,16 L9.999,11 L5,11 L5,10 L10,9.999 L10,5 L11,5 Z"></path>
                            </svg>
                        </div>
                    </div>
                </div> */}
                    <div className="menu-section">
                        <table className="menu-table">
                            <tbody>
                                {
                                    allMenu.length !== undefined &&
                                    // new Array를 이용하여 새 배열 생성(allMenu를 5로 나눈 몫만큼 map을 사용하기 위함)
                                    // allMenu의 길이를 5로 나누고 소수점이 떨어지지 않을 경우를 대비하여 올림
                                    // 그 후에, map은 undefined은 무시하기 때문에 fill을 사용해 모든 요소를 0으로 초기화
                                    new Array(Math.ceil(allMenu.length / 5)).fill(0).map((_, index) => {
                                        // 0번 인덱스 = slice(0, 4), 1번 인덱스 = slice(4, 10)... 5개씩 나누어 출력
                                        const items = allMenu.slice(index * 4, index * 4 + 4);
                                        return (
                                            <tr>
                                                {
                                                    items.map(item => (
                                                        <td>
                                                            <div className='td-content'>
                                                                <Image
                                                                    src={`${item.ATT_FILE_NO_MK}`}
                                                                    style={{ borderRadius: 8 }}
                                                                    width={250}
                                                                    height={250}
                                                                    alt={''}
                                                                />
                                                                <div className='RCP_NM'>{item.RCP_NM}</div>
                                                                <div className='RCP_PAT2'>{item.HASH_TAG}</div>
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
                </div>
                <Footer />
            </div>
            <style jsx> {`
                .contents-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .top-contents-section {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: #111111;
                    margin-top: 13px;
                    margin-bottom: 5px;
                    width: 1080px;
                }
                .sort-button {
                    display: flex;
                    margin-top: 20px;
                    margin-left: 12px;
                    padding: 5px 5px 5px 10px;
                    border: 1px solid #e8e8e8;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: border-color 0.3s ease;
                }
                .sort-button:hover {
                    border-color: rgb(130, 130, 130);
                }
                .sort-button span {
                    font-size: 13px;
                    font-weight: 500;
                }
                .sort-svg {
                    position: relative;
                    width: 18px;
                    top: 1px;
                    margin-left: 20px;
                }
                .hash-tag-section {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    margin-top: 23px;
                    width: auto;
                }
                .hash-tag-section span {
                    font-size: 13px;
                    margin-right: 10px;
                    padding: 5px 8px;
                    background-color: #f2f2f2;
                    color: #323232;
                    border: 1px solid #f2f2f2;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: border-color 0.2s ease;
                }
                .hash-tag-section span:hover {
                    border-color: #323232;
                }
                .hash-tag-section span:last-child {
                    margin-right: 0px;
                }
                .filter-button {
                    display: flex;
                    margin-top: 20px;
                    margin-right: 10px;
                    padding: 5px 13px 5px 10px;
                    border: 1px solid #e8e8e8;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: border-color 0.3s ease;
                }
                .filter-button:hover {
                    border-color: rgb(130, 130, 130);
                }
                .filter-svg {
                    position: relative;
                    width: 17.5px;
                    top: 0.5px;
                    margin-right: 5px;
                }
                .filter-button span {
                    font-size: 13px;
                    font-weight: 500;
                }    
                {/* .contents-container {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    padding: 0 10%;
                    color: #111111;
                    margin-top: 30px;
                } */}
                .filter-section {
                    margin-top: 25px;
                    margin-right: 80px;
                }
                #filter-title {
                    display: flex;
                    justify-content: flex-start;
                }
                #filter-title span {
                    font-weight: 400;
                    font-size: 18px;
                }
                .filter-section div {
                    display: flex;
                    justify-content: space-between;
                    padding: 20px 0 20px 0;
                    border-bottom: 1px solid #d1d1d1;
                }
                .filter-section div span {
                    margin-right: 65px;
                    font-weight: 300;
                    font-size: 15px;
                }
                .plus-svg {
                    position: relative;
                    width: 20px;
                }
                .menu-section {
                    display: flex;
                    justify-content: center;
                    margin-top: 30px;
                    width: 1080px;
                }
                .menu-table {
                    display: flex;
                    flex-direction: column;
                    border-collapse: separate;
                    border-spacing: 0 25px;
                    margin-top: -25px;
                    color: #111111;
                }
                .menu-table tr td {
                    max-width: 220px;
                    vertical-align: top;
                    align-self: start;
                    transition: transform 0.3s ease;
                    padding: 0 25px;
                }
                .menu-table tr td:first-child {
                    padding-left: 0px;
                }
                .menu-table tr td:hover {
                    transform: scale(1.05);
                }
                .td-content {
                    cursor: pointer;
                }
                .RCP_NM {
                    text-align: left;
                    font-size: 15px;
                    font-weight: 400;
                    word-wrap: break-word;
                    word-break: break-all;
                }
                .RCP_PAT2 {
                    font-size: 13px;
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