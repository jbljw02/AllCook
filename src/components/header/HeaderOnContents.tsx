import { useState } from 'react';
import Link from 'next/link';
import { searchByMenuIngredient } from '../../utils/headerSearch';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setDisplayedMenu } from '../../redux/features/menuSlice';
import { useRouter } from 'next/router';
import Image from 'next/image';
import titleLogoSmall from '../../../public/svgs/title-logo-small.svg';
import searchSvg from '../../../public/svgs/search.svg'
import userDark from '../../../public/svgs/user-dark.svg';
import { signOut } from 'firebase/auth';
import { auth } from "@/firebase/firebasedb";
import UserDropdown from '../UserDropdown';

export default function Header({ className }: { className: string }) {
    const dispatch = useDispatch();
    const router = useRouter();

    const allMenu = useSelector((state: RootState) => state.allMenu);
    const displayedMenu = useSelector((state: RootState) => state.displayedMenu);

    const [inputValue, setInputValue] = useState<string>('');
    const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const searchRecipe = (event: React.KeyboardEvent<HTMLInputElement> | string) => {
        if (typeof event !== 'string' && event.key === 'Enter') {
            let newDisplayedMenu = searchByMenuIngredient(inputValue, allMenu);
            dispatch(setDisplayedMenu(newDisplayedMenu));

            // 현재 위치가 레시피 페이지가 아닌 경우에만 세션 스토리지에 이동 했음을 담고, 페이지를 이동시킴
            if (router.pathname !== '/recipe') {
                sessionStorage.setItem('navigated', 'true');
                router.push('/recipe');
            }

            // 검색어가 공란일 경우 초기 상태로 되돌림
            if (inputValue === '') {
                dispatch(setDisplayedMenu(allMenu));
            }
        }
        else if (typeof event === 'string') {
            let newDisplayedMenu = searchByMenuIngredient(event, allMenu);
            dispatch(setDisplayedMenu(newDisplayedMenu));

            // 현재 위치가 레시피 페이지가 아닌 경우에만 세션 스토리지에 이동 했음을 담고, 페이지를 이동시킴
            if (router.pathname !== '/recipe') {
                sessionStorage.setItem('navigated', 'true');
                router.push('/recipe');
            }

            // 검색어가 공란일 경우 초기 상태로 되돌림
            if (inputValue === '') {
                dispatch(setDisplayedMenu(allMenu));
            }
        }
    }

    const user = useSelector((state: RootState) => state.user);
    const [userDetail, setUserDetail] = useState<boolean>(false);

    return (
        <>
            <header className={`${className} header`}>
                {/* 메뉴 네비게이션 바 */}
                <div className='left-nav'>
                    <span className='home'>
                        <Link
                            style={{ textDecoration: 'none', color: 'inherit' }}
                            href={'/'}>
                            Home
                        </Link>
                    </span>
                    <span className='recipe'>
                        <Link
                            style={{ textDecoration: 'none', color: 'inherit' }}
                            href={'/recipe'}>
                            Recipe
                        </Link>
                    </span>
                    <span className='contact'>
                        <Link
                            style={{ textDecoration: 'none', color: 'inherit' }}
                            href={'/contact'}>
                            Contact
                        </Link>
                    </span>
                </div>
                {/* 타이틀 이미지 */}
                <div className='title-logo-div'>
                    <Link href={''}>
                        <Image src={titleLogoSmall} className='title-logo-small' alt={''} />
                    </Link>
                </div>
                {/* 검색창 및 로그인 네비게이션 바 */}
                <div className='right-nav'>
                    <div className='input-div'>
                        {/* onKeyDown = 키가 눌렸을 때 발생 */}
                        <input
                            onKeyDown={searchRecipe}
                            value={inputValue}
                            onChange={changeInput}
                            className='search-input'
                            placeholder='메뉴, 재료로 검색' />
                        <Image onClick={() => searchRecipe(inputValue)} className='search-svg' src={searchSvg} alt='' />
                    </div>
                    <div
                        className='user-container no-drag'
                        onClick={() => setUserDetail(!userDetail)}>
                        <Image
                            className='user-svg on-contents'
                            src={userDark}
                            alt={''} />
                        {
                            !user.email && !user.name ?
                                <span className='logIn' onClick={() => router.push('/signIn')}>
                                    로그인
                                </span> :
                                <>
                                    <span className='logIn'>
                                        {user.name}
                                    </span>
                                    <svg
                                        width='17'
                                        className={`${userDetail ?
                                            'sort-svg-header rotate-clockwise'
                                            : 'sort-svg-header'}`}
                                        style={{ marginTop: '1px' }}
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="m9 4.5-3 3-3-3" stroke="currentColor" stroke-linecap="round"></path>
                                    </svg>
                                </>
                        }
                    </div>
                    {
                        userDetail && user && user.name !== '' && user.email !== '' ?
                            <UserDropdown
                                category='header'
                            /> :
                            null
                    }
                </div>
            </header>
            <style jsx>{`
                .header {
                    position: fixed;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    background-color: #ffffff;
                    color: #111111;
                    z-index: 1000;
                    border-bottom: 0.8px solid #e8e8e8;
                    padding-top: 15px;
                    padding-bottom: 15px;
                }
                .left-nav {
                    display: flex;
                    flex-direction: row;
                    font-size: 15.5px;
                    font-weight: 300;
                    margin-left: 180px;
                }
                .left-nav span {
                    margin-right: 22px;
                    cursor: pointer;
                }
                .left-nav span:nth-child(3) {
                    margin-right: 0px;
                }
                .title-logo-div {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%); 
                }
                .title-logo-small {
                    width: 24px;
                    cursor: pointer;
                }
                .right-nav {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    margin-top: -6px;
                    margin-right: 150px;
                }
                .search-input {
                    background-color: #f2f2f2;
                }
        `}</style>
        </>
    )
}