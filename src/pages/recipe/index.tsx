import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Seo from "../../components/Seo";
import SortList from "../../components/recipe/SortList";
import filterSvg from '../../../public/svgs/filter.svg';
import RecipeTable from "@/components/table/RecipeTable";
import FilterDetail from "@/components/recipe/filterDetail/FilterDetail";
import HashTags from "@/components/recipe/HashTags";
import NoneMenu from "@/components/recipe/NoneMenu";

export default function Recipe() {
    const allMenu = useSelector((state: RootState) => state.allMenu);
    const displayedMenu = useSelector((state: RootState) => state.displayedMenu);

    const [filterVisible, setFilterVisible] = useState<boolean>(false);  // '상세검색' 클릭 시 띄워지는 창을 관리하기 위한 state
    const filterRef = useRef<HTMLDivElement | null>(null);

    // filter-div 외부를 클릭하면 창을 닫음
    useEffect(() => {
        const filterOutsideClick = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setFilterVisible(false);
            }
        }

        // 사용자가 마우스를 누를 때마다 웹 페이지에 이벤트 발생
        document.addEventListener("mousedown", filterOutsideClick);
        return () => {
            document.removeEventListener("mousedown", filterOutsideClick);
        }
    }, [filterRef]);

    return (
        <>
            <Seo title="메뉴" />
            <div className="container-float-top">
                {/* 헤더와 풋터를 제외한 영역 */}
                <div className="contents-container">
                    {/* 정렬, 해시태그, 상세검색 등을 보여주는 영역 */}
                    <div className="top-contents-section">
                        <div className="sortList-section">
                            {/* 레시피의 정렬 기준을 결정하는 영역 */}
                            <SortList />
                        </div>
                        <div className="hash-tag-section">
                            <HashTags />
                        </div>
                        <div ref={filterRef} className="filter-button-div">
                            <span
                                className='filter-button'
                                onClick={() => setFilterVisible(!filterVisible)}>
                                <Image
                                    className="filter-svg"
                                    src={filterSvg}
                                    alt=''
                                    fetchPriority="auto"
                                />
                                <span className="no-drag">상세검색</span>
                            </span>
                            {/* 상세 검색 영역 */}
                            {
                                filterVisible &&
                                <FilterDetail
                                    setFilterVisible={setFilterVisible}
                                />
                            }
                        </div>
                    </div>
                    {/* 메뉴를 보여주는 영역 */}
                    {
                        // 전체 메뉴는 존재하고 화면에 보여질 메뉴가 없는 상태
                        // 즉, 검색 결과가 없는 상태엔 다른 화면을 보여줌
                        allMenu.length && !displayedMenu.length ?
                            <NoneMenu /> :
                            <RecipeTable />
                    }
                </div>
            </div>
            <style jsx> {`
                .contents-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    height: 100%;
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
                    justify-content: center;
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
                .sortList-section {
                    margin-right: 115px;
                }
                .filter-button-div {
                    display: flex;
                    justify-content: center;
                }
                .filter-button {
                    display: flex;
                    justify-content: center;
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
                .filter-button-div span {
                    font-size: 13px;
                    font-weight: 500;
                }   
            `}</style>
        </>
    )
}

export const getStaticProps = () => {
    return {
        props: {},
    }
}