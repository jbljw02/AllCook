type Params = {
    currentPage: number,
    onClick?: (param: string) => void,
}

export default function PrevPageDouble({ currentPage, onClick }: Params) {
    return (
        <span
            className="page-move-btn"
            onClick={() => { onClick && onClick('down') }}>
            <svg
                className={`${onClick ?
                    'movePage-svg double-arrow left cursor-pointer' :
                    'no-movePage-svg double-arrow left cursor-auto'}`}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                <path stroke={currentPage === 1 ? '#E8EBEE' : 'currentColor'} strokeLinecap="round" strokeWidth="1.4" d="m6 12 4-4-4-4"></path>
                <path stroke={currentPage === 1 ? '#E8EBEE' : 'currentColor'} strokeLinecap="round" strokeWidth="1.4" d="m10 12 4-4-4-4"></path>
            </svg>
        </span>
    )
}