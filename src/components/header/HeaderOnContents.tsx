import { useEffect, useState } from 'react';
import { searchByMenuIngredient } from '@/utils/headerSearch';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setDisplayedMenu } from '@/redux/features/menuSlice';
import { useRouter } from 'next/router';
import Image from 'next/image';
import titleLogoSmall from '../../../public/svgs/title-logo-small.svg';
import userDark from '../../../public/svgs/user-dark.svg';
import UserDropdown from './UserDropdown';
import { setSearchInput } from '@/redux/features/searchInputSlice';
import { setCurrentPage } from '@/redux/features/recipePageSlice';
import SearchInput from '../input/SearchInput';

export default function Header({ className }: { className: string }) {
    const dispatch = useDispatch();
    const router = useRouter();

    const allMenu = useSelector((state: RootState) => state.allMenu);

    const [isUpdated, setIsUpdated] = useState<boolean>(false);

    useEffect(() => {
        if (isUpdated) {
            router.push('/recipe').then(() => setIsUpdated(false));
        }
    }, [isUpdated, router]);

    const recipeClick = () => {
        dispatch(setDisplayedMenu(allMenu));
        dispatch(setSearchInput(''));
        router.push('/recipe');
        dispatch(setCurrentPage(1));
    }

    const user = useSelector((state: RootState) => state.user);
    const [userDetail, setUserDetail] = useState<boolean>(false);

    return (
        <>
            <header className={`${className} header`}>
                {/* 메뉴 네비게이션 바 */}
                <div className='left-nav'>
                    <span
                        className='home'
                        onClick={() => {
                            router.push('/');
                            dispatch(setSearchInput(''));
                        }}>
                        Home
                    </span>
                    <span
                        className='recipe'
                        onClick={recipeClick}>
                        Recipe
                    </span>
                    <span
                        className='contact'
                        onClick={() => {
                            router.push('/contact');
                            dispatch(setSearchInput(''));
                        }}>
                        Contact
                    </span>
                </div>
                {/* 타이틀 이미지 */}
                <div
                    className='title-logo-div'
                    onClick={() => router.push('/')}>
                    <Image
                        src={titleLogoSmall}
                        className='title-logo-small'
                        alt={''}
                        fetchPriority="auto"
                    />
                </div>
                {/* 검색창 및 로그인 네비게이션 바 */}
                <div className='right-nav'>
                    <SearchInput inputBackgroundColor={'#f2f2f2'}  />
                    <div
                        className='user-container no-drag'
                        onClick={() => setUserDetail(!userDetail)}>
                        <Image
                            className='user-svg on-contents'
                            src={userDark}
                            alt={''}
                            fetchPriority="auto"
                        />
                        {
                            !user || (!user.email && !user.name) ?
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
                                        <path d="m9 4.5-3 3-3-3" stroke="currentColor" strokeLinecap="round"></path>
                                    </svg>
                                </>
                        }
                    </div>
                    {
                        userDetail && user && user.name !== '' && user.email !== '' ?
                            <UserDropdown
                                category='header-on-contents'
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