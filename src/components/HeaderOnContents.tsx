import { RefObject, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { searchByMenuIngredient } from '../utils/headerSearch';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setDisplayedMenu } from '../redux/features/menuSlice';
import { useRouter } from 'next/router';

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
            console.log("이벤트");
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
        else if(typeof event === 'string') {
            console.log("스트링");
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

    return (
        <>
            <header className={`${className} header`}>
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
                        <Link href={''}>
                            <svg className='title-logo' xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 1103.000000 1280.000000" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" stroke='#000000' stroke-width="350">
                                    <path d="M3150 12793 c-854 -61 -1716 -430 -2251 -963 -58 -58 -133 -141 -168 -185 -657 -827 -898 -2265 -610 -3635 56 -268 75 -322 303 -890 117 -289 168 -476 235 -850 111 -619 167 -1389 143 -1965 -15 -382 -39 -473 -279 -1095 -250 -646 -311 -851 -332 -1112 -20 -246 26 -449 141 -615 89 -130 281 -299 473 -416 213 -129 893 -444 1226 -567 738 -273 1467 -420 2399 -481 256 -17 865 -17 1005 -1 557 65 1022 201 1288 376 177 116 227 221 247 516 15 216 27 344 60 670 61 607 98 819 186 1095 50 155 120 296 276 555 332 552 691 1085 1428 2115 431 604 623 876 845 1200 109 160 270 393 358 519 427 613 616 936 742 1274 189 507 217 1230 70 1813 -60 238 -149 451 -261 622 -81 124 -246 291 -384 389 -218 155 -506 265 -815 313 -142 22 -471 30 -635 16 -258 -23 -720 -118 -720 -148 0 -7 -12 -15 -27 -19 -16 -3 -35 -8 -43 -10 -11 -2 -23 18 -43 72 -37 98 -130 236 -210 311 -165 154 -377 239 -692 278 -116 15 -218 17 -600 16 -603 -2 -744 11 -990 89 -168 54 -284 105 -695 306 -479 234 -597 283 -820 339 -247 62 -574 88 -850 68z m445 -253 c330 -30 580 -94 880 -225 72 -32 185 -79 253 -106 223 -89 351 -161 445 -247 46 -44 60 -72 35 -72 -7 0 -56 -20 -109 -43 -647 -292 -1242 -1221 -1409 -2198 -34 -201 -66 -725 -57 -944 8 -205 42 -319 125 -416 30 -34 132 -113 138 -106 1 1 -4 56 -12 122 -21 174 -29 686 -15 870 42 538 139 970 306 1360 199 465 499 829 850 1032 79 46 248 120 345 151 668 214 1454 195 1969 -49 421 -199 628 -515 703 -1069 18 -133 15 -508 -6 -700 -32 -293 -102 -514 -248 -783 -102 -187 -159 -274 -458 -692 -216 -302 -301 -434 -393 -613 -90 -174 -93 -168 46 -111 314 129 687 582 978 1184 88 181 124 270 180 435 110 324 128 464 105 846 -29 481 -20 607 54 761 88 179 256 278 590 348 154 32 411 44 541 26 427 -61 757 -301 986 -716 126 -228 211 -493 262 -816 45 -283 54 -614 22 -784 -82 -429 -285 -973 -504 -1350 -58 -100 -627 -1015 -765 -1230 -362 -565 -631 -937 -962 -1335 -88 -104 -194 -236 -237 -293 -289 -383 -457 -563 -631 -678 -169 -112 -308 -112 -426 -1 -95 90 -99 188 -16 353 50 98 249 417 500 799 124 190 263 401 307 470 84 130 293 476 293 485 0 8 -120 -55 -169 -88 -109 -75 -236 -210 -343 -367 -36 -52 -139 -221 -228 -375 -233 -402 -313 -517 -464 -668 -88 -87 -199 -165 -283 -198 -82 -32 -252 -33 -373 -1 -225 60 -432 208 -519 372 -40 76 -52 135 -52 265 -1 254 81 525 272 904 89 176 97 195 81 207 -14 10 -22 7 -52 -16 -143 -113 -234 -274 -345 -610 -75 -228 -107 -309 -157 -393 -50 -86 -148 -186 -210 -215 -114 -53 -278 -47 -548 18 -91 22 -248 57 -350 79 -270 58 -393 105 -480 187 -91 85 -111 179 -103 481 10 348 -26 692 -109 1056 -29 125 -34 138 -52 135 -20 -3 -21 -7 -16 -138 10 -265 5 -783 -8 -900 -29 -256 -91 -442 -169 -510 -44 -39 -133 -81 -223 -105 -101 -26 -361 -32 -490 -10 -126 21 -236 56 -316 100 -63 35 -128 99 -144 139 -5 13 -29 264 -55 557 -25 294 -48 544 -51 557 -3 15 -12 22 -28 22 -26 0 -34 -20 -60 -150 -17 -88 -23 -159 -36 -455 -17 -360 -52 -478 -178 -596 -113 -107 -265 -171 -355 -150 -97 23 -142 89 -183 271 -11 48 -17 174 -24 490 -11 545 -29 669 -180 1260 -33 129 -72 281 -86 338 -25 95 -28 102 -48 96 -11 -4 -22 -7 -23 -8 -1 -1 11 -139 27 -306 97 -991 127 -1543 99 -1798 -12 -111 -42 -257 -65 -310 -17 -41 -51 -82 -69 -82 -49 0 -123 190 -175 449 -16 80 -45 274 -65 431 -62 495 -74 539 -379 1425 -48 138 -106 329 -130 425 -264 1057 -133 2235 349 3120 113 209 236 372 405 540 134 133 239 218 415 335 455 301 980 476 1580 528 93 8 398 6 500 -3z m-1090 -7370 c717 -21 1138 -60 1655 -150 777 -137 1425 -345 2012 -646 112 -57 311 -158 443 -223 364 -180 476 -249 590 -366 172 -176 166 -302 -32 -645 -89 -155 -117 -214 -151 -321 -130 -407 -209 -948 -231 -1577 -4 -128 -10 -235 -13 -238 -3 -3 -70 27 -148 66 -820 411 -1857 739 -2855 904 -1180 195 -2328 177 -3265 -53 l-75 -18 -4 21 c-5 33 18 189 51 336 37 163 91 336 210 660 188 512 230 648 280 910 16 87 21 172 28 485 9 408 13 440 67 551 64 132 241 235 480 280 188 35 406 40 958 24z m410 -3381 c1228 -67 2313 -337 3259 -810 218 -109 349 -193 420 -269 95 -101 51 -155 -209 -258 -847 -334 -1881 -313 -3111 62 -203 62 -801 262 -974 326 -355 131 -588 287 -662 445 -28 60 -30 73 -26 143 11 189 138 295 421 352 143 29 463 32 882 9z" />
                                    <path d="M3260 11804 c-130 -23 -259 -78 -367 -157 -361 -267 -669 -823 -724 -1307 -20 -182 3 -326 74 -445 l41 -70 17 139 c39 310 116 566 255 847 238 479 581 803 955 900 49 13 89 26 89 30 0 3 -39 18 -87 32 -85 26 -201 40 -253 31z" />
                                    <path d="M9220 10544 c0 -4 41 -110 90 -236 140 -353 184 -534 184 -758 0 -263 -41 -434 -209 -892 -77 -207 -155 -454 -155 -490 0 -7 39 26 86 72 230 228 386 588 445 1028 65 486 -35 910 -270 1142 -74 73 -171 149 -171 134z" />
                                </g>
                            </svg>
                        </Link>
                    </div>
                    {/* 검색창 및 로그인 네비게이션 바 */}
                    <div className='right-nav'>
                        <div className='input-container'>
                            {/* onKeyDown = 키가 눌렸을 때 발생 */}
                            <input
                                onKeyDown={searchRecipe}
                                value={inputValue}
                                onChange={changeInput}
                                className='search-input'
                                placeholder='메뉴, 재료로 검색' />
                            <svg onClick={() => {searchRecipe(inputValue)}} className="img-search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="21" height="21">
                                <path fill="currentColor" d="M3.5 8a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM8 2a6 6 0 1 0 3.65 10.76l3.58 3.58 1.06-1.06-3.57-3.57A6 6 0 0 0 8 2Z"></path>
                            </svg>
                        </div>
                        <div className='user-container'>
                            <span className='user-img-span'>
                                <svg className="user-img" data-bbox="0 0 50 50" data-type="shape" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                                    <path d="M25 48.077c-5.924 0-11.31-2.252-15.396-5.921 2.254-5.362 7.492-8.267 15.373-8.267 7.889 0 13.139 3.044 15.408 8.418-4.084 3.659-9.471 5.77-15.385 5.77m.278-35.3c4.927 0 8.611 3.812 8.611 8.878 0 5.21-3.875 9.456-8.611 9.456s-8.611-4.246-8.611-9.456c0-5.066 3.684-8.878 8.611-8.878M25 0C11.193 0 0 11.193 0 25c0 .915.056 1.816.152 2.705.032.295.091.581.133.873.085.589.173 1.176.298 1.751.073.338.169.665.256.997.135.515.273 1.027.439 1.529.114.342.243.675.37 1.01.18.476.369.945.577 1.406.149.331.308.657.472.98.225.446.463.883.714 1.313.182.312.365.619.56.922.272.423.56.832.856 1.237.207.284.41.568.629.841.325.408.671.796 1.02 1.182.22.244.432.494.662.728.405.415.833.801 1.265 1.186.173.154.329.325.507.475l.004-.011A24.886 24.886 0 0 0 25 50a24.881 24.881 0 0 0 16.069-5.861.126.126 0 0 1 .003.01c.172-.144.324-.309.49-.458.442-.392.88-.787 1.293-1.209.228-.232.437-.479.655-.72.352-.389.701-.78 1.028-1.191.218-.272.421-.556.627-.838.297-.405.587-.816.859-1.24a26.104 26.104 0 0 0 1.748-3.216c.208-.461.398-.93.579-1.406.127-.336.256-.669.369-1.012.167-.502.305-1.014.44-1.53.087-.332.183-.659.256-.996.126-.576.214-1.164.299-1.754.042-.292.101-.577.133-.872.095-.89.152-1.791.152-2.707C50 11.193 38.807 0 25 0"></path>
                                </svg>
                            </span>
                            <span className='logIn'>
                                로그인
                            </span>
                        </div>
                    </div>
                </div>
            </header >
            <style jsx>{`
                .header {
                    position: fixed;
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
                }
                .left-nav span {
                    margin-right: 22px;
                    cursor: pointer;
                }
                .left-nav span:nth-child(3) {
                    margin-right: 0px;
                }
                .title-logo-div {
                    margin: 0 auto;
                    margin-left: 446px;
                    margin-right: 325px;
                }
                .title-logo {
                    width: 24px;
                    margin-left: 25px;
                    cursor: pointer;
                }
                .right-nav {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    margin-top: -6px;
                }
                .search-input {
                    background-color: #f2f2f2;
                }
        `}</style>
        </>
    )
}