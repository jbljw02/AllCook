import { FavoriteRecipes, setFavoriteRecipe } from "@/redux/features/favoriteRecipeSlice";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function FolderList() {
    const dispatch = useDispatch();

    const favoriteRecipes = useSelector((state: RootState) => state.favoriteRecipes);

    const [isAddFolder, setIsAddFolder] = useState<boolean>(false); // 현재 새 폴더를 추가중인지
    const [newFolderName, setNewFolderName] = useState<string>(''); // 새 폴더의 이름

    // 새 폴더의 이름을 변경
    const newFolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewFolderName(e.target.value);
    }

    // 새 폴더의 이름을 state에 push
    const newFolderSave = (e: { key: string; }) => {
        // 이름을 입력하고 엔터키를 누른 경우, 폴더가 추가됨
        if (e.key == 'Enter') {
            if (newFolderName.trim() !== '') {
                dispatch(setFavoriteRecipe({ name: newFolderName }));
                setNewFolderName('');
                setIsAddFolder(false);
            }
        }
        // ESC 키를 누를 경우, 폴더 추가 작업이 취소
        else if(e.key === 'Escape') {
            setIsAddFolder(false);
            setNewFolderName('');
        }
    }

    // 포커스를 input 밖으로 두면 폴더 추가 작업 취소
    const newFolderBlur = () => {
        setIsAddFolder(false);
        setNewFolderName('');
    }

    return (
        <>
            <div className="folder-list-section">
                {
                    favoriteRecipes.map((item: FavoriteRecipes) => {
                        return (
                            <>
                                <div className="folder">
                                    <div className="folder-thumbnail"></div>
                                    <div className="title">{item.name}</div>
                                </div>
                            </>
                        )
                    })
                }
                {
                    // 폴더를 추가하려는 상태일 때만 보이도록 함
                    isAddFolder &&
                    <div className="folder">
                        <div className="folder-thumbnail" />
                        <div className="title">
                            <input
                                className="new-folder-input"
                                type="text"
                                value={newFolderName}
                                onChange={newFolderNameChange}
                                onKeyDown={newFolderSave}
                                onBlur={newFolderBlur}
                                placeholder="폴더의 이름을 정해주세요!"
                            />
                        </div>
                    </div>
                }
                <div className="folder" onClick={() => setIsAddFolder(true)}>
                    <div className="folder-thumbnail add-folder-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" viewBox="0 0 24 24" fill="none">
                            <rect width="24" height="24" fill="white" />
                            <path d="M12 6V18" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M6 12H18" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div className="title">새 폴더 만들기</div>
                </div>
            </div>
            <style jsx>{`
                .folder-list-section {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    margin-bottom: 130px;
                }
                .folder {
                    margin-right: 15px;
                    margin-bottom: 50px;
                    cursor: pointer;
                }
                .folder-thumbnail {
                    width: 290px;
                    height: 220px;
                    background-color: #f9fafc;
                }
                .title {
                    margin-top: 12px;
                    font-size: 17px;
                }
                .add-folder-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1.5px dotted #d7d7d7;
                    background-color: #ffffff;
                    transition: border-color 0.2s ease;
                }
                .add-folder-btn:hover {
                    border-color: #111111;
                }
                .new-folder-input {
                    outline: none;
                    font-size: 17px;
                    border: 1px solid transparent;
                }
            `}</style>
        </>
    )
}