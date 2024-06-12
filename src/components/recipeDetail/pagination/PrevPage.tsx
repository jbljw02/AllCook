type Params = {
    currentPage: number,
    onClick?: (param: string) => void,
}

export default function PrevPage({ currentPage, onClick }: Params) {
    return (
        <>
            <span
                className="page-move-btn"
                onClick={() => { onClick && onClick('down') }}>
                <svg
                    className={`${onClick ? 'movePage-svg left cursor-pointer' : 'no-movePage-svg left cursor-auto'}`}
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                    <path stroke={currentPage === 1 ? '#E8EBEE' : 'currentColor'} strokeLinecap="round" strokeWidth="1.4" d="m6 12 4-4-4-4"></path>
                </svg>
            </span>
            <style jsx>{`
                span {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    border-radius: 50%;
                    margin-right: 13px;
                    width: 32px;
                    height: 32px;
                    transition: background-color 0.2s ease;
                }
                .movePage-svg {
                    padding: 5px 5px 5px 5px;
                    border: 1px solid #ebeef0;
                    border-radius: 50%;
                    position: relative;
                    top: 4.5px;
                    width: 17px;
                    transition: background-color 0.2s ease;
                }
                .movePage-svg:hover {
                    background-color: #E8EBEE;
                }
                .no-movePage-svg {
                    padding: 5px 5px 5px 5px;
                    border: 1px solid #ebeef0;
                    border-radius: 50%;
                    position: relative;
                    top: 4.5px;
                    width: 17px;
                }
                .left {
                    transform: rotate(180deg);
                }
            `}</style>
        </>
    )
}