import Image from "next/image"
import { useDispatch } from "react-redux";
import { setRecipeAddModal, setRecipeMoveModal } from "@/redux/features/favoriteRecipeSlice";
import EmptyMenu from "../placeholder/EmptyMenu";

type ParamsType = {
    ATT_FILE_NO_MK: string,
    ATT_FILE_NO_MAIN: string,
    folderName: string,
}

export default function AddCompletePopUp({ ATT_FILE_NO_MK, ATT_FILE_NO_MAIN, folderName }: ParamsType) {
    const dispatch = useDispatch();

    return (
        <>
            <div className="add-complete-container fade-in">
                {
                    ATT_FILE_NO_MK || ATT_FILE_NO_MAIN ?
                        <Image
                            style={{ borderRadius: '3px' }}
                            width={42}
                            height={42}
                            src={ATT_FILE_NO_MK || ATT_FILE_NO_MAIN}
                            alt=""
                            fetchPriority="high"
                        /> :
                        <EmptyMenu
                            width="42px"
                            height="42px"
                        />
                }
                <div className="add-complete-section">
                    <div className="title">
                        <span>{folderName}</span>에 레시피가 저장되었습니다.
                    </div>
                    <div
                        className="subtitle underline"
                        onClick={() => {
                            dispatch(setRecipeMoveModal(true))
                            dispatch(setRecipeAddModal(false))
                        }}>
                        다른 폴더에 저장하기
                    </div>
                </div>
            </div>
            <style jsx>{`
                .add-complete-container {
                    position: fixed;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    bottom: 18px;
                    right: 18px;
                    width: auto;
                    height: 60px;
                    background-color: #111111;
                    z-index: 1000;
                    padding: 8px 15px;
                    color: #ffffff;
                    border-radius: 10px;
                    opacity: .9;
                }
                .add-complete-section {
                    margin-left: 15px;
                }
                .title {
                    font-size: 14.5px;
                    font-weight: 300;
                }
                .title span {
                    font-weight: 500;
                }
                .subtitle {
                    display: inline-block;
                    font-size: 14px;
                    font-weight: 300;
                    cursor: pointer;
                }
            `}</style>
        </>
    )
}