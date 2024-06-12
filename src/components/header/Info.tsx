

export default function Info() {

    return (
        <>
            <div className="info-container">

                <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#757575" stroke-width="1.7" />
                    <path d="M12 17V11" stroke="#757575" stroke-width="1.7" stroke-linecap="round" />
                    <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" fill="#757575" />
                </svg>
            </div>
            <style jsx>{`
                .info-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                svg {
                    margin-top: 8px;
                    margin-right: 12px;
                }
            `}</style>
        </>
    )
}