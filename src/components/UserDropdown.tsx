import { setUser } from "@/redux/features/userSlice";
import logout from "@/utils/logout";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import bookmarkSvg from "../../public/svgs/bookmark.svg";
import userSvg from '../../public/svgs/name.svg';

export default function UserDropdown({ category }: { category: string }) {
    const router = useRouter();
    const dispatch = useDispatch();

    const [isHovered, setIsHovered] = useState<boolean>(false);

    const signOut = () => {
        logout();
        dispatch(setUser(null));
    }

    return (
        <>
            <div className={`${category === 'header' ?
                'user-detail-dropdown' :
                'on-contents-dropdown'} 
                ${isHovered ?
                    'hovered' :
                    ''}`}>
                <div
                    className='user-detail-div'
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => router.push('/savedRecipe')}>
                    <svg className="bookmark svg" xmlns="http://www.w3.org/2000/svg" width="17px" height="17px" fill="none" viewBox="0 0 17.5 17.5">
                        <path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.8" d="m15 16-5-3.333L5 16V5.333c0-.353.15-.692.418-.942S6.05 4 6.428 4h7.143c.38 0 .743.14 1.01.39.269.25.419.59.419.943V16z" />
                    </svg>
                    <div>관심 레시피</div>
                </div>
                <div
                    className='user-detail-div'
                    onClick={() => router.push('/userDetail')}>
                    <svg className="svg" xmlns="http://www.w3.org/2000/svg" width="17px" height="17px" viewBox="0 0 25 25" fill="none">
                        <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#292D32" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="#292D32" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div>회원 정보</div>
                </div>
                <div
                    className='user-detail-div'
                    onClick={signOut}>
                    <svg className="svg" xmlns="http://www.w3.org/2000/svg" width="17px" height="17px" viewBox="0 0 23 23" fill="none">
                        <path d="M15 16.5V19C15 20.1046 14.1046 21 13 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3H13C14.1046 3 15 3.89543 15 5V8.0625M11 12H21M21 12L18.5 9.5M21 12L18.5 14.5" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div>로그아웃</div>
                </div>
            </div>
            <style jsx>{`
                .user-detail-dropdown, .on-contents-dropdown {
                    position: absolute;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    font-size: 13px;
                    top: 80px;
                    margin-left: 180px;
                    color: #111111;
                    border: 1px solid #e8e8e8;
                    background-color: #ffffff;
                    border-radius: 8px;
                    width: 160px;
                    font-weight: 300;
                }
                .on-contents-dropdown {
                    top: 60px;
                    border: 1px solid #e8e8e8;
                    border-bottom: none;
                }
                .user-detail-dropdown::before {
                    content: "";
                    position: absolute;
                    top: -10px;
                    right: 15px; 
                    width: 0;
                    height: 0;
                    border-left: 10px solid transparent; 
                    border-right: 10px solid transparent; 
                    border-bottom: 10px solid #ffffff; 
                }
                .user-detail-dropdown.hovered::before {
                    border-bottom: 10px solid #f2f2f2; 
                }
                .on-contents-dropdown::before {
                    content: "";
                    position: absolute;
                    top: -10px; 
                    right: 11px;
                    width: 0;
                    height: 0;
                    border-left: 10px solid transparent;
                    border-right: 10px solid transparent; 
                    border-bottom: 10px solid #e8e8e8;
                }
                .on-contents-dropdown::after {
                    content: "";
                    position: absolute;
                    top: -9px; 
                    right: 12px; 
                    width: 0;
                    height: 0;
                    border-left: 9px solid transparent; 
                    border-right: 9px solid transparent;
                    border-bottom: 9px solid #ffffff; 
                }
                .on-contents-dropdown.hovered::after {
                    border-bottom: 9px solid #f2f2f2;
                }
                .user-detail-div {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
                    cursor: pointer;
                    padding: 10px 5px 10px 10px;
                    border-bottom: 1px solid #e8e8e8;
                }
                .user-detail-div:hover {
                    background-color: #f2f2f2;
                    {/* font-weight: 400; */}
                }
                .user-detail-div:first-child {
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                }
                .user-detail-div:last-child {
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                }
                .user-detail-div div {
                    margin-left: 7px;
                }
                .svg {
                    position: relative;
                    top: 0.5px;
                }
                .bookmark {
                    position: relative;
                    right: 1.3px;
                    top: 0px;
                }
            `}</style>
        </>
    )
}