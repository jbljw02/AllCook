type Params = {
    currentPage: number,
    totalPageCount: number,
    onClick?: (param: string) => void,
}

export default function NextPageDouble({ currentPage, totalPageCount, onClick }: Params) {
    return (
        <span
            className="page-move-btn"
            onClick={() => { onClick && onClick('up') }}>
            <svg
                className={`${onClick ?
                    'movePage-svg double-arrow right cursor-pointer' :
                    'no-movePage-svg double-arrow right cursor-auto'}`}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                <path stroke={currentPage === totalPageCount ? '#E8EBEE' : 'currentColor'} strokeLinecap="round" strokeWidth="1.4" d="m6 12 4-4-4-4"></path>
                <path stroke={currentPage === totalPageCount ? '#E8EBEE' : 'currentColor'} strokeLinecap="round" strokeWidth="1.4" d="m10 12 4-4-4-4"></path>
            </svg>
        </span>
    )
}