import { RootState } from "@/redux/store";
import { Menu } from "@/redux/features/menuSlice";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import ModifyNav from "../favoriteRecipe/ModifyNav";
import { useDispatch, useSelector } from "react-redux";
import { setIsCheckedRecipe } from "@/redux/features/favoriteRecipeSlice";
import React from "react";

type paramsType = {
    menu: Menu[],
    category: string,
    menuClick: (name: string, seq: string) => void,
    isModify?: boolean,
}

export const MenuTable: React.FC<paramsType> = ({ menu, category, menuClick, isModify }) => {
    const dispatch = useDispatch();

    const [menuHovered, setMenuHovered] = useState<boolean[]>([]);

    const imgMouseEnter = (index: number) => {
        setMenuHovered((prev) => {
            const newHoverState = [...prev];
            newHoverState[index] = true;
            return newHoverState;
        })
    };
    const imgMouseOut = (index: number) => {
        setMenuHovered((prev) => {
            const newHoverState = [...prev];
            newHoverState[index] = false;
            return newHoverState;
        })
    };

    const [splitedMenu, setSplitedMenu] = useState<Menu[][]>();

    // 메뉴 배열을 4개씩 분할
    const splitMenu = useCallback(() => {
        const result = [];
        for (let i = 0; i < menu.length; i += 4) {
            result.push(menu.slice(i, i + 4));
        }
        setSplitedMenu(result);
    }, [menu]);

    useEffect(() => {
        splitMenu();
    }, [menu, splitMenu]);

    const isFavRecipeDelete = useSelector((state: RootState) => state.isFavRecipeDelete);
    const isCheckedRecipe = useSelector((state: RootState) => state.isCheckedRecipe);

    // 개별 레시피들의 체크 여부를 추가
    const checkRecipe = (RCP_SEQ: string) => {
        dispatch(setIsCheckedRecipe(RCP_SEQ));
    }

    const displayedMenu = useSelector((state: RootState) => state.displayedMenu);

    /* recipe/index에 사용되는 변수 및 메소드 */
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
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

    return (
        <>
            <div className="menu-table-container">
                {
                    category === 'modify' &&
                    <div style={{ marginBottom: '14px' }}>
                        <ModifyNav category="recipe" />
                    </div>
                }
                <table className="menu-table">
                    <tbody>
                        {
                            splitedMenu && category === 'modify' ?
                                splitedMenu.map((rowMenu, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {
                                            rowMenu.length &&
                                            rowMenu.map((item, index) => {
                                                const globalIndex = index + rowIndex * 4;
                                                return (
                                                    <td key={globalIndex}>
                                                        <div>
                                                            <div
                                                                className="td-content"
                                                                onClick={() => {
                                                                    !isFavRecipeDelete ?
                                                                        menuClick(item.RCP_NM, item.RCP_SEQ) :
                                                                        checkRecipe(item.RCP_SEQ);
                                                                }}>
                                                                {
                                                                    isFavRecipeDelete &&
                                                                    <input
                                                                        className="recipe-delete-checkbox cursor-pointer"
                                                                        type="checkbox"
                                                                        // find의 결과가 undefined인지 여부에 따라 체크박스의 상태 설정
                                                                        checked={isCheckedRecipe.some(element => element === item.RCP_SEQ)} />
                                                                }
                                                                <Image
                                                                    src={`${item.ATT_FILE_NO_MK}`}
                                                                    style={{
                                                                        borderRadius: 8,
                                                                        cursor: "pointer",
                                                                        transition: "transform 0.3s ease",
                                                                        // ex) 첫번째 행의 두번째 요소 -> 1+0=1
                                                                        // 두번째 행의 첫번째 요소 -> 1+1*4=5
                                                                        transform: menuHovered[globalIndex]
                                                                            ? "scale(1.05)"
                                                                            : "scale(1)"
                                                                    }}
                                                                    width={250}
                                                                    height={250}
                                                                    alt={""}
                                                                    onMouseEnter={() => imgMouseEnter(globalIndex)}
                                                                    onMouseLeave={() => imgMouseOut(globalIndex)}
                                                                />
                                                            </div>
                                                            <div className="RCP_NM">{item.RCP_NM}</div>
                                                            <div className="RCP_PAT2">{item.RCP_PAT2}</div>
                                                        </div>
                                                    </td>
                                                );
                                            })
                                        }
                                    </tr>
                                )) :
                                (
                                    category === 'recipe' ?
                                        null :
                                        // 추천 메뉴일 경우 4개만 출력
                                        <tr>
                                            {
                                                menu.slice(0, 4).map((item, index) => {
                                                    return (
                                                        <td key={index}>
                                                            <div>
                                                                <div onClick={() => menuClick(item.RCP_NM, item.RCP_SEQ)} className="td-content">
                                                                    <Image
                                                                        src={`${item.ATT_FILE_NO_MK}`}
                                                                        style={{
                                                                            borderRadius: 8,
                                                                            cursor: "pointer",
                                                                            transition: "transform 0.3s ease",
                                                                            // ex) 첫번째 행의 두번째 요소 -> 1+0=1
                                                                            // 두번째 행의 첫번째 요소 -> 1+1*4=5
                                                                            transform: menuHovered[index]
                                                                                ? "scale(1.05)"
                                                                                : "scale(1)"
                                                                        }}
                                                                        width={250}
                                                                        height={250}
                                                                        alt={""}
                                                                        onMouseEnter={() => imgMouseEnter(index)}
                                                                        onMouseLeave={() => imgMouseOut(index)}
                                                                    />
                                                                </div>
                                                                <div className="RCP_NM">{item.RCP_NM}</div>
                                                                <div className="RCP_PAT2">{item.RCP_PAT2}</div>
                                                            </div>
                                                        </td>
                                                    );
                                                })
                                            }
                                        </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default MenuTable;