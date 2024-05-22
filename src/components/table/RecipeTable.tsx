import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useState, useEffect } from "react";
import moveToDetail from "@/utils/moveToDetail";
import { setRecipe } from "@/redux/features/recipeSlice";
import SkeletonUI from "../Skeleton";
import { setCurrentPage } from "@/redux/features/recipePageSlice";
import React from "react";

export default function RecipeTable() {
    const dispatch = useDispatch();

    const allMenu = useSelector((state: RootState) => state.allMenu);
    const displayedMenu = useSelector((state: RootState) => state.displayedMenu);

    const currentPage = useSelector((state: RootState) => state.currentPage);
    const trPerPage = 6; // 한 페이지에 출력할 tr의 개수
    const tdPerPage = 24; // 한 페이지에 출력할 td의 개수
    const [currentBlock, setCurrentBlock] = useState(1); // 현재 페이지 블록의 번호
    const pagesPerBlock = 10; // 한 블록에 출력할 페이지 번호의 개수
    const totalPagecount = Math.ceil(displayedMenu.length / tdPerPage); // 전체 페이지의 수의 올림값
    const startPage = (currentBlock - 1) * pagesPerBlock + 1; // 페이지의 시작 인덱스
    // 마지막 페이지는 10, 20, 30.. 등등이 마지막 페이지 번호가 아닐 수 있음
    // 그렇기 때문에 전체 페이지의 개수와 현재 블록의 마지막 인덱스중 더 작은 값을 endPage로 설정
    // ex) 23이 마지막 페이지 번호라고 한다면, 30과 23중엔 23이 작은 값이므로 23 할당
    const endPage = Math.min(currentBlock * pagesPerBlock, totalPagecount);

    // 현재 페이지 번호가 변경될 때마다 블록번호를 업데이트
    // currentPage가 1~10일 때, currentBlock은 1, 11~20일 때 2...
    useEffect(() => {
        setCurrentBlock(Math.ceil(currentPage / pagesPerBlock));
    }, [currentPage]);

    // 특정 메뉴를 클릭하면 해당 메뉴의 레시피 페이지로 이동
    const menuClick = (name: string, seq: string) => {
        const selectedMenu = moveToDetail(name, seq, displayedMenu);
        dispatch(setRecipe(selectedMenu));
    }

    const [isHovered, setIsHovered] = useState(new Array(displayedMenu.length).fill(false));  // 페이지 전체에 있는 이미지의 hover 여부를 관리

    const imgMouseEnter = (globalIndex: number) => {
        setIsHovered(prev => {
            // state의 이전 상태를 그대로 가져와서, 마우스가 들어온 인덱스만 true로 변경
            const newHoverState = [...prev];
            newHoverState[globalIndex] = true;
            return newHoverState;
        });
    }
    const imgMouseOut = (globalIndex: number) => {
        setIsHovered(prev => {
            const newHoverState = [...prev];
            // state의 이전 상태를 그대로 가져와서, 마우스가 나간 인덱스만 false로 변경
            newHoverState[globalIndex] = false;
            return newHoverState;
        });
    };

    // 버튼을 통해 페이지를 이동
    const movePage = (param: string) => {
        if (param === 'up' && currentPage < totalPagecount) {
            dispatch(setCurrentPage(currentPage + 1))
        }
        if (param === 'down' && currentPage > 1) {
            dispatch(setCurrentPage(currentPage - 1))
        }
    }

    return (
        <>
            <div className="menu-section">
                {
                    displayedMenu.length && allMenu.length ?
                        <table className="menu-table">
                            <tbody>
                                {
                                    // new Array를 이용하여 새 배열 생성(displayedMenu를 4로 나눈 몫만큼 map을 사용하기 위함)
                                    // displayedMenu의 길이를 4로 나누고 소수점이 떨어지지 않을 경우를 대비하여 Math.ceil을 이용해 올림
                                    // Math.min을 통해 tr의 최대 개수를 trPerPage(6개) 만큼으로 제한
                                    // 그 후에, map은 undefined은 무시하기 때문에 fill을 사용해 모든 요소를 0으로 초기화
                                    Array(Math.min(Math.ceil(displayedMenu.length / 4), trPerPage)).fill(0).map((_, index) => {
                                        // 한 페이지에 출력할 메뉴의 개수를 설정
                                        // 1페이지 = slice(0, 24), 2페이지 = slice(24, 48)...
                                        const startIndex = (currentPage - 1) * tdPerPage;
                                        const endIndex = startIndex + tdPerPage;
                                        const menuPerPage = displayedMenu.slice(startIndex, endIndex);
                                        // 0번째 tr = slice(0, 4), 2번째 tr = slice(4, 8)... 4개씩 나누어 출력
                                        const items = menuPerPage.slice(index * 4, index * 4 + 4);
                                        const hoverState = isHovered;
                                        return (
                                            <tr key={index}>
                                                {
                                                    items.map((item, localIndex) => {
                                                        // 단순 index를 사용하면 현재 tr 내부로 제한되기 때문에, 페이지 전체의 인덱스를 계산해서 사용
                                                        const globalIndex = startIndex + index * 4 + localIndex;
                                                        return (
                                                            <React.Fragment key={localIndex}>
                                                                <td>
                                                                    <div>
                                                                        <div
                                                                            onClick={() => menuClick(item.RCP_NM, item.RCP_SEQ)}
                                                                            className="td-content">
                                                                            <Image
                                                                                src={`${item.ATT_FILE_NO_MK}`}
                                                                                style={{
                                                                                    borderRadius: 8,
                                                                                    cursor: 'pointer',
                                                                                    transition: 'transform 0.3s ease',
                                                                                    transform: hoverState[globalIndex] ?
                                                                                        'scale(1.05)' :
                                                                                        'scale(1)'
                                                                                }}
                                                                                width={250}
                                                                                height={250}
                                                                                alt={''}
                                                                                onMouseEnter={() => imgMouseEnter(globalIndex)}
                                                                                onMouseLeave={() => imgMouseOut(globalIndex)}
                                                                            />
                                                                        </div>
                                                                        <div className='RCP_NM'>{item.RCP_NM}</div>
                                                                        <div className='RCP_PAT2'>{item.RCP_PAT2}</div>
                                                                    </div>
                                                                </td>
                                                            </React.Fragment>
                                                        )
                                                    })
                                                }
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table> :
                        <SkeletonUI length={24} />
                }
            </div>
            <div className="pagination-section">
                {
                    // 현재 페이지가 첫 페이지라면, 이전 페이지로 이동할 수 없음을 알림
                    currentPage !== 1 ?
                        <span
                            onClick={() => movePage('down')}>
                            <svg className="movePage-svg left" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path stroke={currentPage === 1 ? '#E8EBEE' : 'currentColor'} strokeLinecap="round" strokeWidth="1.4" d="m6 12 4-4-4-4"></path>
                            </svg>
                        </span> :
                        <span
                            id="no-movePage-span">
                            <svg className="no-movePage-svg left" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path stroke={currentPage === 1 ? '#E8EBEE' : 'currentColor'} strokeLinecap="round" strokeWidth="1.4" d="m6 12 4-4-4-4"></path>
                            </svg>
                        </span>
                }
                {
                    /* Array는 배열을 생성하여 내부를 undefined로 채움
                    하지만 Array.from은 반복 가능한 객체를 얕은 복사하여 새 배열 생성(배열의 각 요소를 사용해야 할 때 사용) */
                    // ex) startPage = 11, endPage = 20
                    // length = 10, startPage + index = 11 + 0, 11 + 1, ... 11 + 9
                    // 즉, 11, 12, 13, .. 20으로 이루어진 배열 생성 
                    Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index)
                        .map((pageNumber) => {
                            return (
                                pageNumber === currentPage ?
                                    <span
                                        key={pageNumber}
                                        onClick={() => dispatch(setCurrentPage((pageNumber)))}
                                        style={{ backgroundColor: '#002312', color: '#ffffff' }}>
                                        {pageNumber}
                                    </span> :
                                    <span
                                        key={pageNumber}
                                        className="pagination-hover"
                                        onClick={() => dispatch(setCurrentPage((pageNumber)))}>
                                        {pageNumber}
                                    </span>
                            )
                        })
                }
                {
                    // 현재 페이지가 마지막 페이지라면, 이후 페이지로 이동할 수 없음을 알림
                    currentPage !== totalPagecount ?
                        <span
                            onClick={() => movePage('up')}
                            className="movePage-span">
                            <svg className="movePage-svg right"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 16 16">
                                <path
                                    stroke={currentPage === Math.ceil(displayedMenu.length / tdPerPage) ? '#E8EBEE' : 'currentColor'}
                                    strokeLinecap="round"
                                    strokeWidth="1.4" d="m6 12 4-4-4-4">
                                </path>
                            </svg>
                        </span> :
                        <span
                            id="no-movePage-span">
                            <svg
                                className="no-movePage-svg right"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 16 16">
                                <path
                                    stroke={currentPage === Math.ceil(displayedMenu.length / tdPerPage) ? '#E8EBEE' : 'currentColor'}
                                    strokeLinecap="round"
                                    strokeWidth="1.4"
                                    d="m6 12 4-4-4-4">
                                </path>
                            </svg>
                        </span>
                }
            </div>
            <style jsx>{`
                .menu-section {
                    display: flex;
                    margin-top: 30px;
                    width: 1080px;
                }
                .pagination-section {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 40px;
                    margin-bottom: 65px;
                }
                .pagination-section span {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    border-radius: 50%;
                    margin-top: 6px;
                    margin-right: 13px;
                    width: 32px;
                    height: 32px;
                    font-size: 15px;
                    transition: background-color 0.2s ease;
                }
                .pagination-hover:hover {
                    background-color: #E8EBEE;
                }
                .pagination-section span:first-child {
                    margin-top: 0px;
                }
                .pagination-section span:last-child {
                    margin-top: 0px;
                    margin-right: 0px;
                }
                #no-movePage-span {
                    cursor: auto;
                }
                .movePage-svg {
                    padding: 5px 5px 5px 5px;
                    border: 1px solid #ebeef0;
                    border-radius: 50%;
                    position: relative;
                    top: 4.5px;
                    width: 17px;
                    transition: background-color 0.2s ease;
                }
                .movePage-svg:hover {
                    background-color: #E8EBEE;
                }
                .no-movePage-svg {
                    padding: 5px 5px 5px 5px;
                    border: 1px solid #ebeef0;
                    border-radius: 50%;
                    position: relative;
                    top: 4.5px;
                    width: 17px;
                }
                .left {
                    transform: rotate(180deg);
                }
            `}</style>
        </>
    )
}