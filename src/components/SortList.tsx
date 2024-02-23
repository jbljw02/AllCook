import { setSortRule } from "@/redux/features/sortSlice";
import { RootState } from "../redux/store";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDisplayedMenu } from "@/redux/features/menuSlice";

interface SortListProps {
    currentPage: number,
    setCurrentPage: Dispatch<SetStateAction<number>>;
}

export default function SortList({ currentPage, setCurrentPage }: SortListProps) {
    const dispatch = useDispatch();

    const [isSortClicked, setIsSortClicked] = useState<boolean>();

    const [sortArray, setSortArray] = useState<string[]>(['가나다순', '추천순', '저열량순', '저지방순', '저나트륨순', '고단백질순']);
    const sortRule = useSelector((state: RootState) => state.sortRule);

    const allMenu = useSelector((state: RootState) => state.allMenu);
    const displayedMenu = useSelector((state: RootState) => state.displayedMenu);

    useEffect(() => {
        if (sortRule === '가나다순') {
            // localeCompare = 사전 순서에 따라 정렬
            let newDisplayedMenu = [...displayedMenu].sort((a, b) => a.RCP_NM.localeCompare(b.RCP_NM));
            dispatch(setDisplayedMenu(newDisplayedMenu));
            setCurrentPage(1);
        }
        else if (sortRule === '추천순') {
            dispatch(setDisplayedMenu(allMenu));
            setCurrentPage(1);
        }
        else if (sortRule === '저열량순') {
            // 비교함수의 반환 값이 0보다 작으면 a가 앞, 0보다 크면 b가 앞, 0이면 위치를 변경하지 않음
            let newDisplayedMEnu = [...displayedMenu].sort((a, b) => a.INFO_ENG - b.INFO_ENG);
            dispatch(setDisplayedMenu(newDisplayedMEnu));
            setCurrentPage(1);
        }
        else if (sortRule === '저지방순') {
            let newDisplayedMenu = [...displayedMenu].sort((a, b) => a.INFO_FAT - b.INFO_FAT);
            dispatch(setDisplayedMenu(newDisplayedMenu));
            setCurrentPage(1);
        }
        else if (sortRule === '저나트륨순') {
            let newDisplayedMenu = [...displayedMenu].sort((a, b) => a.INFO_NA - b.INFO_NA);
            dispatch(setDisplayedMenu(newDisplayedMenu));
            setCurrentPage(1);
        }
        else if (sortRule === '고단백질순') {
            let newDisplayedMenu = [...displayedMenu].sort((a, b) => b.INFO_PRO - a.INFO_PRO);
            dispatch(setDisplayedMenu(newDisplayedMenu));
            setCurrentPage(1);
        }
    }, [sortRule])

    return (
        <>
            <div className={`${!isSortClicked ? 'dropdown-hover' : 'dropdown'} no-drag`}>
                <div onClick={() => setIsSortClicked(!isSortClicked)} className={`${!isSortClicked ? 'dropdown-title' : 'dropdown-title open'}`}>
                    <span>{sortRule}</span>
                    <svg className={`${isSortClicked ? 'counter-clockwise' : ''} sort-svg`} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m9 4.5-3 3-3-3" stroke="currentColor" stroke-linecap="round"></path>
                    </svg>
                </div>
                {
                    isSortClicked &&
                    <>
                        {
                            sortArray.map(item => {
                                return (
                                    <div
                                        onClick={() => {
                                            dispatch(setSortRule(item));
                                            setIsSortClicked(false);
                                        }}
                                        className={`${sortRule === item ? 'selectedRule' : ''} dropdown-item`}>{item}</div>
                                )
                            })
                        }
                    </>
                }
            </div>
            <style jsx>{`
                .dropdown, .dropdown-hover {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    font-size: 13px;
                    position: absolute;
                    margin-top: -4.5px;
                    margin-left: 8px;
                    border: 1px solid #e8e8e8;
                    background-color: #ffffff;
                    border-radius: 8px;
                    z-index: 1000;
                    overflow: hidden;
                    width: 120px;
                }
                .dropdown-hover {
                    transition: border-color 0.3s ease;
                }
                .dropdown-hover:hover {
                    border-color: rgb(130, 130, 130);
                }
                .selectedRule {
                    background-color: #f2f2f2;
                }
                .dropdown div, .dropdown-hover div {
                    padding: 6px 5px 6px 10px;
                    cursor: pointer;
                }
                .dropdown-title {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    cursor: pointer;
                    font-weight: 500;
                    border-radius: 8px;
                    border: 1px solid transparent;
                }
                .sort-svg {
                    position: relative;
                    width: 18px;
                    top: 1px;
                    transition: transform 0.15s ease-in-out;
                }
                .counter-clockwise {
                    transform: rotate(-90deg);
                }
                .open {
                    border-bottom: 1px solid #e8e8e8;
                    border-bottom-left-radius: 0;
                    border-bottom-right-radius: 0;
                }
                .dropdown-item {
                    border-bottom: 1px solid #e8e8e8;
                }
                .dropdown-item:hover {
                    background-color: #f2f2f2;
                }
                .dropdown-item:last-child {
                    border: none;
                }
            `}</style>
        </>
    )
}
