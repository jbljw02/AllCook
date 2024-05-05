import { useRouter } from "next/router"


export default function EmptyFolder() {
    const router = useRouter();
    return (
        <>
            <div className="empty-folder-container">
                <div className="title">폴더에 레시피가 존재하지 않아요</div>
                <button
                    className="cursor-pointer"
                    onClick={() => router.push('/recipe')}>
                    찾아보기
                </button>
            </div>
            <style jsx>{`
                .empty-folder-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 400px;
                    border: 1px solid rgb(232, 232, 232);
                }
                .title {
                    font-size: 17px;
                    margin-bottom: 20px;
                }
                button {
                    color: #ffffff;
                    background-color: #002312;
                    padding: 7px 14px;
                    border: 1px solid transparent;
                    border-radius: 5px;
                    font-size: 15px;
                }
            `}</style>
        </>
    )
}