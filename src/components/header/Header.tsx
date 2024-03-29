import { useState } from 'react';
import Link from 'next/link';
import { Anek_Tamil } from 'next/font/google';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setDisplayedMenu } from '@/redux/features/menuSlice';
import { searchByMenuIngredient } from '../../utils/headerSearch'
import { useRouter } from 'next/router';
import lightTitleLogo from '../../../public/svgs/title-logo-light.svg'
import darkTitleLogo from '../../../public/svgs/title-logo-dark.svg';
import searchSvg from '../../../public/svgs/search.svg';
import userLight from '../../../public/svgs/user-light.svg';
import userDark from '../../../public/svgs/user-dark.svg';
import Image from 'next/image';
import { signOut } from 'firebase/auth';
import { auth } from "@/firebase/firebasedb";
import { setUser } from "@/redux/features/userSlice";

const titleFont = Anek_Tamil({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500'],
});

type Position = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

export default function Header({ position, backgroundColor, color, borderColor, svgFill, lightLogo, inputBackgroundColor }: { position: Position, backgroundColor: string, color: string, borderColor: string, svgFill: string, lightLogo: boolean, inputBackgroundColor: string }) {
    const dispatch = useDispatch();
    const router = useRouter();

    const allMenu = useSelector((state: RootState) => state.allMenu);

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

    const logout = () => {
        signOut(auth).then(() => {
            // 로그아웃 성공 시 실행될 로직
            console.log("로그아웃 성공");
            dispatch(setUser(null));
        }).catch((error) => {
            // 로그아웃 시 오류가 발생한 경우
            console.error("로그아웃 중 오류 발생", error);
        });
    };

    return (
        <>
            <header
                style={{
                    position: position,
                    backgroundColor: backgroundColor,
                    color: color,
                    borderColor: borderColor,
                }}
                className='header'>
                <div className='header-div'>
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
                        <Link href={'/'}>
                            {
                                lightLogo ?
                                    <>
                                        <Image src={lightTitleLogo} className='title-logo' alt={''} />
                                    </> :
                                    <>
                                        <Image src={darkTitleLogo} className='title-logo' alt={''} />
                                    </>
                            }
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
                                style={{ backgroundColor: inputBackgroundColor }}
                                className='search-input'
                                placeholder='메뉴, 재료로 검색' />
                            <Image onClick={() => searchRecipe(inputValue)} className='search-svg' src={searchSvg} alt='' />
                        </div>
                        <div className='user-container'>
                            {/* <span className='user-img-span'> */}
                            {
                                lightLogo ?
                                    <>
                                        <Image
                                            className='user-svg'
                                            src={userLight}
                                            alt={''} />
                                    </> :
                                    <>
                                        <Image
                                            className='user-svg'
                                            src={userDark}
                                            alt={''} />
                                    </>
                            }
                            {
                                user === null ?
                                    <span className='logIn' onClick={() => router.push('/signIn')}>
                                        로그인
                                    </span> :
                                    <>
                                        <span className='logIn' onClick={logout}>
                                            {user}
                                        </span>
                                        <svg width='17' className='sort-svg-header' viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="m9 4.5-3 3-3-3" stroke="currentColor" stroke-linecap="round"></path>
                                        </svg>
                                    </>
                            }
                            {/* </span> */}
                        </div>
                    </div>
                </div>
            </header>
            <style jsx>{`
                .header {
                    width: 100%;
                    height: auto;
                    padding-top: 20px;
                    padding-bottom: 10px;
                    top: 0;
                    border-bottom: 0.8px solid;
                }
                .left-nav {
                    display: flex;
                    flex-direction: row;
                    font-size: 17px;
                    font-weight: 300;
                    margin-top: -10px;
                }
                .left-nav span {
                    margin-right: 22px;
                    cursor: pointer;
                }
                .left-nav span:nth-child(3) {
                    margin-right: 0px;
                }
                .title-logo-div {
                    margin-left: 435px;
                    margin-right: 297px;
                }
                .right-nav {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    margin-top: -11px;
                }
        `}</style>
        </>
    )
}