import { RefObject, useEffect, useRef, useState } from 'react';
import { Roboto } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import chef from '../../public/images/chef.png'
import { Anek_Tamil } from 'next/font/google'

const titleFont = Anek_Tamil({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500'],
});

export default function Header({ backgroundColor, color, borderColor, svgFill }: { backgroundColor: string, color: string, borderColor: string, svgFill: string, }) {
    return (
        <>
            <header style={{ backgroundColor: backgroundColor, color: color, borderColor: borderColor }} className='header'>
                <div>
                    <span className={`${titleFont.className} title`}>All Cook</span>
                    <span className='nav'>
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
                        <span>
                            <svg className="user-img" data-bbox="0 0 50 50" data-type="shape" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                                <path fill={svgFill} d="M25 48.077c-5.924 0-11.31-2.252-15.396-5.921 2.254-5.362 7.492-8.267 15.373-8.267 7.889 0 13.139 3.044 15.408 8.418-4.084 3.659-9.471 5.77-15.385 5.77m.278-35.3c4.927 0 8.611 3.812 8.611 8.878 0 5.21-3.875 9.456-8.611 9.456s-8.611-4.246-8.611-9.456c0-5.066 3.684-8.878 8.611-8.878M25 0C11.193 0 0 11.193 0 25c0 .915.056 1.816.152 2.705.032.295.091.581.133.873.085.589.173 1.176.298 1.751.073.338.169.665.256.997.135.515.273 1.027.439 1.529.114.342.243.675.37 1.01.18.476.369.945.577 1.406.149.331.308.657.472.98.225.446.463.883.714 1.313.182.312.365.619.56.922.272.423.56.832.856 1.237.207.284.41.568.629.841.325.408.671.796 1.02 1.182.22.244.432.494.662.728.405.415.833.801 1.265 1.186.173.154.329.325.507.475l.004-.011A24.886 24.886 0 0 0 25 50a24.881 24.881 0 0 0 16.069-5.861.126.126 0 0 1 .003.01c.172-.144.324-.309.49-.458.442-.392.88-.787 1.293-1.209.228-.232.437-.479.655-.72.352-.389.701-.78 1.028-1.191.218-.272.421-.556.627-.838.297-.405.587-.816.859-1.24a26.104 26.104 0 0 0 1.748-3.216c.208-.461.398-.93.579-1.406.127-.336.256-.669.369-1.012.167-.502.305-1.014.44-1.53.087-.332.183-.659.256-.996.126-.576.214-1.164.299-1.754.042-.292.101-.577.133-.872.095-.89.152-1.791.152-2.707C50 11.193 38.807 0 25 0"></path>
                            </svg>
                        </span>
                        <span>
                            Log In
                        </span>
                        {/* <span>
                            <svg className="user-favorite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.5 20l-6-4.444L6.5 20V5.778c0-.472.18-.924.502-1.257C7.324 4.187 7.76 4 8.214 4h8.572c.454 0 .89.187 1.212.52.321.334.502.786.502 1.258V20z"></path>
                            </svg>
                        </span> */}
                    </span>
                </div>
            </header >
            <style jsx>{`
                .header {
                    position: absolute;
                    width: 100%;
                    height: auto;
                    padding-top: 25px;
                    padding-bottom: 13px;
                    color: #111111;
                    top: 0;
                    z-index: 1000;
                    border-bottom: 0.8px solid;
                }
                .title {
                    float: left;
                    padding-left: 10%;
                    font-size: 32px;
                    display: inline-block;
                    cursor: pointer;
                    font-weight: 400;
                }
                .nav {
                    display: flex;
                    float: right;
                    font-size: 16px;
                    font-weight: 300;
                    padding-top: 5px;
                    padding-right: 10%;
                }
                .nav span {
                    margin-right: 22px;
                    cursor: pointer;
                }
                .nav span:nth-child(3) {
                    margin-right: 30px;
                }
                .nav span:nth-child(4) {
                    margin-right: 8px;
                }
                .nav span:nth-child(5) {
                    margin-right: 12px;
                }
                .user-img {
                    width: 24px;
                }
                .user-favorite {
                    fill: none;
                    width: 25px;
                    padding-top: 1px;
                }
        `}</style>
        </>
    )
}