import { RootState } from "@/redux/store";
import { useSelector } from "react-redux"

type Params = {
    currentPage: number,
    tdPerPage: number,
    onClick?: (param: string) => void,
}

export default function NextPage({ currentPage, tdPerPage, onClick }: Params) {
    const displayedMenu = useSelector((state: RootState) => state.displayedMenu);

    return (
        <span
            className="page-move-btn"
            onClick={() => { onClick && onClick('up') }}>
            <svg
                className={`${onClick ?
                    'movePage-svg' :
                    'no-movePage-svg cursor-auto'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 16 16">
                <path
                    stroke={currentPage === Math.ceil(displayedMenu.length / tdPerPage) ? '#E8EBEE' : 'currentColor'}
                    strokeLinecap="round"
                    strokeWidth="1.4"
                    d="m6 12 4-4-4-4">
                </path>
            </svg>
        </span>
    )
}