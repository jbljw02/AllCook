import { RootState } from "@/redux/store";
import { Menu } from "@/redux/features/menuSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import ModifyNav from "../favoriteRecipe/ModifyNav";
import { useDispatch, useSelector } from "react-redux";
import { setIsCheckedRecipe } from "@/redux/features/favoriteRecipeSlice";
import React from "react";
import PreparingMenu from "../placeholder/PreparingMenu";

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

    // 4개씩 분할되어 표시될 메뉴
    const [splitedMenu, setSplitedMenu] = useState<Menu[]>();

    // 4개씩 분할되어 표시될 메뉴의 이미지 업로드 상태
    const [splitedMenuLoaded, setSplitedMenuLoaded] = useState(new Array(splitedMenu?.length).fill(true));
    // 추천 메뉴의 이미지 업로드 상태
    const [recomMenuLoaded, setRecomMenuLoaded] = useState(new Array(menu.length).fill(true));

    // 이미지 업로드에 성공했을 때
    const handleImgLoad = (index: number) => {
        if (Array.isArray(splitedMenu)) {
            setSplitedMenuLoaded((prev) => {
                const newImgLoadedState = [...prev];
                newImgLoadedState[index] = true;
                return newImgLoadedState;
            });
        }
        if (Array.isArray(menu)) {
            setRecomMenuLoaded((prev) => {
                const newImgLoadedState = [...prev];
                newImgLoadedState[index] = true;
                return newImgLoadedState;
            });
        }
    };

    // 이미지 업로드에 실패했을 때
    const handleImgError = (index: number) => {
        if (Array.isArray(splitedMenu)) {
            setSplitedMenuLoaded((prev) => {
                const newImgLoadedState = [...prev];
                newImgLoadedState[index] = false;
                return newImgLoadedState;
            });
        }
        if (Array.isArray(menu)) {
            setRecomMenuLoaded((prev) => {
                const newImgLoadedState = [...prev];
                newImgLoadedState[index] = false;
                return newImgLoadedState;
            });
        }
    };

    useEffect(() => {
        if (Array.isArray(menu)) {
            setRecomMenuLoaded(new Array(menu.length).fill(true));
            setSplitedMenu([...menu]);
        }
    }, [menu]);

    useEffect(() => {
        if (Array.isArray(splitedMenu)) {
            setSplitedMenuLoaded(new Array(splitedMenu.length).fill(true));
        }
    }, [splitedMenu]);

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
                    <div style={{ marginBottom: '14px' }}>
                        <ModifyNav category="recipe" />
                    </div>
                }
                <table className="menu-table">
                    <tbody>
                        {
                            splitedMenu && category === 'modify' ?
                                // 배열을 4개씩 분할
                                Array.from({ length: Math.ceil(splitedMenu.length / 4) }, (_, i) => splitedMenu.slice(i * 4, i * 4 + 4))
                                    .map((rowMenu, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {
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
                                                                            checked={isCheckedRecipe.some(element => element === item.RCP_SEQ)} />
                                                                    }
                                                                    {
                                                                        splitedMenuLoaded[globalIndex] ?
                                                                            <Image
                                                                                src={item.ATT_FILE_NO_MK || item.ATT_FILE_NO_MAIN}
                                                                                style={{
                                                                                    borderRadius: 8,
                                                                                    cursor: "pointer",
                                                                                    transition: "transform 0.3s ease",
                                                                                    transform: menuHovered[globalIndex]
                                                                                        ? "scale(1.05)"
                                                                                        : "scale(1)"
                                                                                }}
                                                                                width={250}
                                                                                height={250}
                                                                                alt={""}
                                                                                fetchPriority="high"
                                                                                onError={() => handleImgError(globalIndex)}
                                                                                onLoad={() => handleImgLoad(globalIndex)}
                                                                                onMouseEnter={() => imgMouseEnter(globalIndex)}
                                                                                onMouseLeave={() => imgMouseOut(globalIndex)}
                                                                            /> :
                                                                            <PreparingMenu
                                                                                width="250px"
                                                                                height="250px"
                                                                            />
                                                                    }
                                                                </div>
                                                                <div className="RCP_NM">{item.RCP_NM}</div>
                                                                <div className="RCP_PAT2">{item.RCP_PAT2}</div>
                                                            </div>
                                                        </td>
                                                    );
                                                })}
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
                                                                <div
                                                                    onClick={() => menuClick(item.RCP_NM, item.RCP_SEQ)}
                                                                    className="td-content">
                                                                    {
                                                                        recomMenuLoaded[index] ?
                                                                            <Image
                                                                                src={item.ATT_FILE_NO_MK || item.ATT_FILE_NO_MAIN}
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
                                                                                fetchPriority="high"
                                                                                onError={() => handleImgError(index)}
                                                                                onLoad={() => handleImgLoad(index)}
                                                                                onMouseEnter={() => imgMouseEnter(index)}
                                                                                onMouseLeave={() => imgMouseOut(index)}
                                                                            /> :
                                                                            <PreparingMenu
                                                                                width="250px"
                                                                                height="250px"
                                                                            />
                                                                    }
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