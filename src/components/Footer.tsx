import Link from "next/link";

export default function Footer() {

    return (
        <>
            <footer className='footer-container'>
                {/* 왼쪽 영역 */}
                <span className='footer-left'>
                    <div className='footer-title'>
                        All Cook
                        <span>세상의 모든 레시피</span>
                    </div>
                    <div className='recipe-source'>
                        All Cook에서 제공하는 모든 레시피는 식품의약품안전처에서 제공하는 '조리식품의 레시피 DB'를 따릅니다. <br />
                        본 서비스는 상업적인 이익을 추구하지 않습니다.
                    </div>
                </span>
                {/* 오른쪽 영역 */}
                <span className='footer-right'>
                    <div className='footer-menu'>
                        <div className='footer-menu-detail'>
                            <Link
                                style={{ textDecoration: 'none', color: 'inherit' }}
                                href={'/'}>
                                Home
                            </Link>
                        </div>
                        <div className='footer-menu-detail'>
                            <Link
                                style={{ textDecoration: 'none', color: 'inherit' }}
                                href={'/about'}>
                                About
                            </Link>
                        </div>
                        <div className='footer-menu-detail'>
                            <Link
                                style={{ textDecoration: 'none', color: 'inherit' }}
                                href={'/recipe'}>
                                Recipe
                            </Link>
                        </div>
                        <div className='footer-menu-detail'>
                            <Link
                                style={{ textDecoration: 'none', color: 'inherit' }}
                                href={'/contact'}>
                                Contact
                            </Link>
                        </div>
                    </div>
                    <div className='copyright-content'>
                        ©2023 by All Cook. All Rights Reserved.
                    </div>
                </span>
            </footer>
            <style jsx>{`
                {/* footer 영역의 컨테이너 */}
                .footer-container { 
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    background-color: #36755a;
                    opacity: 0.91;
                    color: #ffffff;
                    margin-top: auto;
                }
                {/* footer 왼쪽 영역 */}
                .footer-left {
                    margin-left: 45px;
                    margin-top: 15px;
                }
                .footer-title {
                    margin-top: 10px;
                    padding-bottom: 12px;
                    font-size: 25px;
                    font-weight: 400;
                    border-bottom: 0.8px solid white;
                }
                .footer-title span {
                    padding-left: 7px;
                    font-size: 13px;
                    font-weight: 300;
                }
                .recipe-source {
                    font-size: 13px;
                    font-weight: 300;
                    margin-top: 15px;
                }
                {/* footer 오른쪽 영역 */}
                .footer-right {
                    display: flex;
                    flex-direction: column;
                    margin-right: 50px;
                    height: 100%;
                    margin-top: 25px;
                    margin-bottom: 20px;
                }
                .footer-menu {
                    display: flex;
                    flex-direction: row;
                }
                .footer-menu-detail {
                    margin-right: 20px;
                    font-size: 15px;
                    text-decoration: underline;
                    font-weight: 300;
                    cursor: pointer;
                }
                .footer-menu-detail:nth-child(4) {
                    margin-right: 0px;
                }
                .copyright-content {
                    font-size: 13px;
                    font-weight: 200;
                    text-align: left;
                    margin-top: 60px;
                    margin-bottom: 10px;
                }
            `}</style>
        </>
    )
}