import { RefObject, useEffect, useRef, useState } from 'react';
import { Roboto } from 'next/font/google';
import Link from 'next/link';

export default function Header({ backgroundColor, color }: { backgroundColor: string, color: string }) {

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
            <header style={{ backgroundColor: backgroundColor, color: color }} className='header'>
                <span className={`title`}>All Cook</span>
                <span className='nav'>
                    <span className='home'>
                        <Link
                            style={{ textDecoration: 'none', color: 'inherit' }}
                            href={'/'}>
                            Home
                        </Link>
                    </span>
                    {/* <span className='about'>
                        <Link
                            style={{ textDecoration: 'none', color: 'inherit' }}
                            href={'/about'}>
                            About
                        </Link>
                    </span> */}
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
                </span>
            </header>
            <style jsx>{`
                .header {
                    position: absolute;
                    width: 100%;
                    height: auto;
                    color: #111111;
                    transition: background-color 0.3s ease;
                    top: 0;
                    z-index: 1000;
                    {/* border-bottom: 0.8px solid #e8e8e8; */}
                    {/* box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);  */}
                    {/* color: white; */}
                    {/* background-color: #107070; */}
                    {/* background-color: #faf8f1; */}
                    {/* background-color: #36755a; */}
                }
                .visible {
                    {/* z-index: 1000;
                    color: #000000;
                    background-color: #36755a; */}
                    {/* box-shadow: 0 10px 9px rgba(0, 0, 0, 0.1); */}
                }
                .title {
                    font-size: 25px;
                    padding-top: 20px;
                    padding-left: 50px;
                    padding-bottom: 18px;
                    display: inline-block;
                    font-weight: 400;
                    cursor: pointer;
                }
                .nav {
                    position: relative;
                    float: right;
                    padding-top: 26px;
                    margin-right: 20px;
                    font-size: 16px;
                    font-weight: 300;
                }
                .nav span {
                    margin-right: 35px;
                    cursor: pointer;
                }
                .nav span:nth-child(3) {
                    margin-right: 15px;
                }
        `}</style>
        </>
    )
}