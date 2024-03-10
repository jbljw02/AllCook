export default function ContactInput({ height, placeholder, msgWhether }: { height: string, placeholder: string, msgWhether: boolean }) {


    return (
        <>
            <div className={`${msgWhether ? 'input-div-background' : 'input-div'}`}>
                <input className="search-input" style={{ height: height }} placeholder={placeholder} />
            </div>
            <style jsx>{`
                .input-div {
                    background-color: transparent;
                    border-bottom: 1px solid #787878;
                    margin-right: 0px;
                }
                .input-div-background {
                    border-radius: 5px;
                    border: 1px solid #adadad;
                }
                .search-input {
                    background-color: transparent;
                    padding-left: 6px;
                    font-size: 14.5px;
                    width: 97%;
                }
            `}</style>
        </>
    )
}