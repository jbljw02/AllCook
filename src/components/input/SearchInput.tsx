import { displayedMenuSlice, setDisplayedMenu } from "@/redux/features/menuSlice";
import { RootState } from "@/redux/store";
import { searchByMenuIngredient } from "@/utils/headerSearch";
import Image from "next/image"
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import searchSvg from '../../../public/svgs/search.svg';
import { setIsVisible, setSearchInput } from "@/redux/features/searchInputSlice";

export default function SearchInput({ inputBackgroundColor }: { inputBackgroundColor: string }) {
    const dispatch = useDispatch();
    const router = useRouter();

    const [isUpdated, setIsUpdated] = useState<boolean>(false);
    const isVisible = useSelector((state: RootState) => state.isVisible);
    const searchInput = useSelector((state: RootState) => state.searchInput);

    const allMenu = useSelector((state: RootState) => state.allMenu);
    const displayedMenu = useSelector((state: RootState) => state.displayedMenu);

    const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchInput(event.target.value));
    }

    useEffect(() => {
        if (isUpdated) {
            router.push('/recipe').then(() => setIsUpdated(false));
        }
    }, [isUpdated, router]);

    useEffect(() => {
        if (displayedMenu === allMenu) {
            dispatch(setIsVisible(false));
        }
    }, [displayedMenu]);

    const searchRecipe = async (event: React.KeyboardEvent<HTMLInputElement> | string) => {
        if (typeof event !== 'string' && event.key === 'Enter') {
            if (searchInput !== '') {
                const newDisplayedMenu = searchByMenuIngredient(searchInput, allMenu);
                dispatch(setDisplayedMenu(newDisplayedMenu));
                setIsUpdated(true);
                dispatch(setIsVisible(true));
            }
            else {
                dispatch(setDisplayedMenu(allMenu));
                setIsUpdated(true);
            }
        }
        else if (typeof event === 'string') {
            if (searchInput !== '') {
                const newDisplayedMenu = searchByMenuIngredient(event, allMenu);
                dispatch(setDisplayedMenu(newDisplayedMenu));
                setIsUpdated(true);
                dispatch(setIsVisible(true));
            }
            else {
                dispatch(setDisplayedMenu(allMenu));
                setIsUpdated(true);
            }
        }
    };

    const resetRecipes = () => {
        dispatch(setIsVisible(false));
        dispatch(setSearchInput(''));
        dispatch(setDisplayedMenu(allMenu));
    }

    return (
        <>
            <div
                className='input-div'
                style={{ backgroundColor: inputBackgroundColor }}>
                {/* onKeyDown = 키가 눌렸을 때 발생 */}
                <Image
                    onClick={() => searchRecipe(searchInput)}
                    className='search-svg cursor-pointer'
                    src={searchSvg}
                    alt=''
                    fetchPriority="auto" />
                <input
                    onKeyDown={searchRecipe}
                    value={searchInput}
                    onChange={changeInput}
                    style={{ backgroundColor: inputBackgroundColor }}
                    className='search-input'
                    placeholder='메뉴, 재료로 검색' />
                <svg
                    onClick={resetRecipes}
                    className={`delete-svg cursor-pointer ${isVisible ? 'visible' : ''}`} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.5 5.00024 5.5002 11M5.5 5.00012l5.9998 5.99978" stroke="#949a9e" stroke-width="1.3" stroke-linecap="round"></path>
                </svg>
            </div>
            <style jsx>{`
                .input-div {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    border: none;
                    margin-top: 6px;
                    margin-right: 25px;
                    border-radius: 10px;
                    width: 215px;
                    padding-left: 8px;
                }
                .search-input {
                    outline: none;
                    width: 83%;
                    height: 30px;
                    font-size: 14px;
                    padding-top: 3px;
                    padding-bottom: 3px;
                    padding-left: 5px;
                    border-radius: 10px;
                    border: none;
                }
                .search-svg {
                    color: #ffffff;
                }
                .delete-svg {
                    width: 21px;
                    height: 21px;
                    margin-right: 7px;
                    visibility: hidden;
                }
                .delete-svg.visible {
                    visibility: visible;
                }
            `}</style>
        </>
    )
}