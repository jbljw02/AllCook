import { setUser } from "@/redux/features/userSlice";
import logout from "@/utils/logout";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";

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
                    <div>관심 레시피</div>
                </div>
                <div
                    className='user-detail-div'
                    onClick={() => router.push('/userDetail')}>
                    <div>회원 정보</div>
                </div>
                <div
                    className='user-detail-div'
                    onClick={signOut}>
                    <div>로그아웃</div>
                </div>
            </div>
            <style jsx>{`
                .user-detail-dropdown, .on-contents-dropdown {
                    position: absolute;
                    display: flex;
                    flex-direction: column;
                    top: 70px;
                    margin-left: 254px;
                    font-size: 12.8px;
                    color: #111111;
                    background-color: #ffffff;
                    border-radius: 3px;
                    align-items: flex-start;
                    width: 110px;
                    font-weight: 300;
                }
                .on-contents-dropdown {
                    top: 54px;
                    border: 1px solid #e8e8e8;
                    border-bottom: none;
                }
                .user-detail-dropdown::before {
                    content: "";
                    position: absolute;
                    top: -5px;
                    right: 10px; 
                    width: 0;
                    height: 0;
                    border-left: 5px solid transparent; 
                    border-right: 5px solid transparent; 
                    border-bottom: 5px solid #ffffff; 
                }
                .user-detail-dropdown.hovered::before {
                    border-bottom: 5px solid #f2f2f2; 
                }
                .on-contents-dropdown::before {
                    content: "";
                    position: absolute;
                    top: -6px; 
                    right: 11px;
                    width: 0;
                    height: 0;
                    border-left: 6px solid transparent;
                    border-right: 6px solid transparent; 
                    border-bottom: 6px solid #e8e8e8;
                }
                .on-contents-dropdown::after {
                    content: "";
                    position: absolute;
                    top: -5px; 
                    right: 12px; 
                    width: 0;
                    height: 0;
                    border-left: 5px solid transparent; 
                    border-right: 5px solid transparent;
                    border-bottom: 5px solid #ffffff; 
                }
                .on-contents-dropdown.hovered::after {
                    border-bottom: 5px solid #f2f2f2;
                }
                .user-detail-div {
                    width: 95px;
                    padding: 6.5px 5px 6.5px 10px;
                    padding-top: 3;
                    cursor: pointer;
                    border-bottom: 1px solid #e8e8e8;
                }
                .user-detail-div:hover {
                    background-color: #f2f2f2;
                    font-weight: 400;
                }
                .user-detail-div:first-child {
                    border-top-left-radius: 3px;
                    border-top-right-radius: 3px;
                }
                .user-detail-div:last-child {
                    margin-bottom: 0px;
                    border-bottom-left-radius: 3px;
                    border-bottom-right-radius: 3px;
                }
            `}</style>
        </>
    )
}