import { RefObject, useEffect, useRef, useState } from 'react';
import { Roboto } from 'next/font/google';
import Link from 'next/link';

const roboto = Roboto({
    subsets: ['latin'],
    weight: ["100", "300", "400", "500", "700", "900"],
})

export default function Header() {

    // 클릭한 곳으로 스크롤을 이동
    // const clickToScroll = (param: RefObject<HTMLDivElement>) => {
    //     if (param === homeRef) {
    //         if (homeRef.current !== null) {
    //             homeRef.current.scrollIntoView({ behavior: 'smooth' });
    //         }
    //     }
    //     else if (param === aboutRef) {
    //         if (aboutRef.current !== null) {
    //             aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    //         }
    //     }
    // }

    return (
        <>
            <header className='header'>
                <span className={`${roboto.className} title`}>All Cook</span>
                <span className='nav'>
                    <span className={`${roboto.className} home`}>
                        <Link
                            style={{ textDecoration: 'none', color: 'inherit' }}
                            href={'/'}>
                            Home
                        </Link>
                    </span>
                    <span className={`${roboto.className} about`}>
                        <Link
                            style={{ textDecoration: 'none', color: 'inherit' }}
                            href={'/about'}>
                            About
                        </Link>
                    </span>
                    <span className={`${roboto.className} recipe`}>
                        <Link
                            style={{ textDecoration: 'none', color: 'inherit' }}
                            href={'/recipe'}>
                            Recipe
                        </Link>
                    </span>
                    <span className={`${roboto.className} contact`}>
                        <Link
                            style={{ textDecoration: 'none', color: 'inherit' }}
                            href={'/contact'}>
                            Contact
                        </Link>
                    </span>
                </span>
            </header>
            <style jsx>{`
                {/* 헤더 */}
                .header {
                    position: fixed;
                    width: 100%;
                    height: 80px;
                    color: #ffffff;
                    transition: background-color 0.3s ease;
                }
                .visible {
                    {/* z-index: 1000;
                    color: #000000;
                    background-color: #36755a; */}
                    {/* box-shadow: 0 10px 9px rgba(0, 0, 0, 0.1); */}
                }
                .title {
                    font-size: 30px;
                    padding-top: 25px;
                    padding-left: 50px;
                    padding-bottom: 20px;
                    display: inline-block;
                    font-weight: 400;
                    cursor: pointer;
                }
                .nav {
                    position: relative;
                    float: right;
                    padding-top: 30px;
                    margin-right: 35px;
                    font-size: 20px;
                }
                .nav span {
                    margin-right: 30px;
                    cursor: pointer;
                }
                .nav span:nth-child(4) {
                    margin-right: 15px;
                }
        `}</style>
        </>
    )
}