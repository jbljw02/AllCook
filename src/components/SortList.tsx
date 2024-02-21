import { setSortRule } from "@/redux/features/sortSlice";
import { RootState } from "../redux/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SortList() {
    const dispatch = useDispatch();

    const [isSortClicked, setIsSortClicked] = useState<boolean>();

    const [sortArray, setSortArray] = useState<string[]>(['가나다순', '추천순', '저칼로리순', '고단백질순']);
    const sortRule = useSelector((state: RootState) => state.sortRule);

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
                                    <div onClick={() => {
                                        dispatch(setSortRule(item));
                                        setIsSortClicked(false);
                                    }}
                                        className="dropdown-item">{item}</div>
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
