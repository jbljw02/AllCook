import { setAllMenu, setDessertMenu } from "@/redux/features/menuSlice";
import { Menu, RootState, wrapper } from "@/redux/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import ModifyNav from "./favoriteRecipe/ModifyNav";
import { useDispatch, useSelector } from "react-redux";
import { setIsCheckedRecipe } from "@/redux/features/favoriteRecipeSlice";
import { update } from "firebase/database";

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
    const splitMenu = () => {
        const result = [];
        for (let i = 0; i < menu.length; i += 4) {
            result.push(menu.slice(i, i + 4));
        }
        setSplitedMenu(result);
    }

    useEffect(() => {
        splitMenu();
    }, [menu]);

    const isFavRecipeDelete = useSelector((state: RootState) => state.isFavRecipeDelete);
    const isCheckedRecipe = useSelector((state: RootState) => state.isCheckedRecipe);

    // 개별 레시피들의 체크 여부를 추가
    const checkRecipe = (RCP_SEQ: string) => {
        dispatch(setIsCheckedRecipe(RCP_SEQ));
    }

    return (
        <>
            <div className="menu-table-container">
                {
                    category === 'modify' &&
                    <ModifyNav />
                }
                <table className="menu-table">
                    <tbody>
                        {
                            splitedMenu && category !== 'recom' ?
                                splitedMenu.map((rowMenu, rowIndex) => (
                                    <tr>
                                        {
                                            rowMenu.length &&
                                            rowMenu.map((item, index) => {
                                                const globalIndex = index + rowIndex * 4;
                                                return (
                                                    <td>
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
                                                                        checked={!!isCheckedRecipe.find(element => element === item.RCP_SEQ)} />
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
                                // 추천 메뉴일 경우 4개만 출력
                                <tr>
                                    {
                                        menu.slice(0, 4).map((item, index) => {
                                            return (
                                                <td>
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
                        }
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default MenuTable;