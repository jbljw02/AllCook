import { FavoriteRecipe, addFavoriteRecipeFolder, setIsCheckedFolder } from "@/redux/features/favoriteRecipeSlice";
import { RootState } from "@/redux/store";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipeThumbnail from "./RecipeThumbnail";
import sendNewFolder from "@/utils/fetch/sendNewFolder";
import { useRouter } from "next/router";
import React from "react";

export default function FolderList() {
    const dispatch = useDispatch();
    const router = useRouter();

    const favoriteRecipe = useSelector((state: RootState) => state.favoriteRecipe);
    const user = useSelector((state: RootState) => state.user);

    const [isAddFolder, setIsAddFolder] = useState<boolean>(false); // 현재 새 폴더를 추가중인지
    const [newFolderName, setNewFolderName] = useState<string>(''); // 새 폴더의 이름
    const [folderDuplicated, setFolderDuplicated] = useState<boolean>(false);
    const nameRef = useRef<HTMLInputElement>(null);

    // 새 폴더의 이름을 변경
    const newFolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewFolderName(e.target.value);
    }

    // 새 폴더의 이름을 state에 push
    const newFolderSave = async (e: { key: string; }) => {
        // 이름을 입력하고 엔터키를 누른 경우, 폴더가 추가됨
        if (e.key == 'Enter') {
            if (newFolderName.trim() !== '') {
                const isDuplicated = favoriteRecipe.find(item => item.folderName === newFolderName);
                if (isDuplicated) {
                    setFolderDuplicated(true);
                }
                else {
                    dispatch(addFavoriteRecipeFolder({ folderName: newFolderName, recipes: [] }));
                    setNewFolderName('');
                    setIsAddFolder(false);
                    setFolderDuplicated(false);

                    // ex)현재 배열에 요소가 2개 있다면 다음 id는 3, 0개 있다면 다음 id는 1
                    const nextFolderId = favoriteRecipe.length > 0 ? favoriteRecipe[favoriteRecipe.length - 1].folderId + 1 : 1;
                    // DB에 새로운 폴더를 추가
                    await sendNewFolder(user.email, nextFolderId, newFolderName, []);
                }
            }
        }
        // ESC 키를 누를 경우, 폴더 추가 작업이 취소
        else if (e.key === 'Escape') {
            setIsAddFolder(false);
            setNewFolderName('');
            setFolderDuplicated(false);
        }
    }

    // 포커스를 input 밖으로 두면 폴더 추가 작업 취소
    const newFolderBlur = () => {
        setIsAddFolder(false);
        setNewFolderName('');
        setFolderDuplicated(false);
    }

    // 폴더 추가 작업을 시작
    const addNewFolder = () => {
        setIsAddFolder(true);
    }

    // 폴더 추가 작업이 실행되면, 입력 포커스를 새 폴더의 input으로 이동
    useEffect(() => {
        if (isAddFolder && nameRef.current) {
            nameRef.current.focus();
        }
    }, [isAddFolder]);

    // 클릭한 폴더의 상세 페이지로 이동
    const moveToFolderDetail = (folderId: number) => {
        router.push({
            pathname: `/folder/${folderId}`,
            query: { folderId: folderId },
        });
    }

    const isFavFolderDelete = useSelector((state: RootState) => state.isFavFolderDelete);
    const isCheckedFolder = useSelector((state: RootState) => state.isCheckedFolder);

    const checkFolder = (folderId: number) => {
        dispatch(setIsCheckedFolder(folderId));
    }

    return (
        <>
            <div className="folder-list-section">
                {
                    favoriteRecipe.map((item: FavoriteRecipe) => {
                        return (
                            <React.Fragment key={item.folderId}>
                                <div
                                    key={item.folderId}
                                    className="folder"
                                    onClick={() => {
                                        !isFavFolderDelete ?
                                            moveToFolderDetail(item.folderId) :
                                            checkFolder(item.folderId);
                                    }}>
                                    {
                                        (isFavFolderDelete && item.folderId !== 0) &&
                                        <input
                                            className="recipe-delete-checkbox cursor-pointer"
                                            type="checkbox"
                                            // find의 결과가 undefined인지 여부에 따라 체크박스의 상태 설정
                                            checked={isCheckedFolder.some(element => element === item.folderId)} />
                                    }
                                    <div className="folder-thumbnail">
                                        <RecipeThumbnail
                                            recipes={item.recipes}
                                            size={280}
                                        />
                                    </div>
                                    <div className="title">{item.folderName}</div>
                                </div>
                            </React.Fragment>
                        )
                    })
                }
                {
                    // 폴더를 추가하려는 상태일 때만 보이도록 함
                    isAddFolder &&
                    <div className="folder" id="new-folder">
                        <div className="folder-thumbnail add-thumbnail" />
                        <div className="title">
                            <input
                                className="new-folder-input"
                                type="text"
                                ref={nameRef}
                                value={newFolderName}
                                onChange={newFolderNameChange}
                                onKeyDown={newFolderSave}
                                onBlur={newFolderBlur}
                                placeholder="폴더의 이름을 정해주세요"
                            />
                        </div>
                        {
                            folderDuplicated &&
                            <div className="duplicated-folder">이미 존재하는 폴더명입니다</div>
                        }
                    </div>
                }
                <div className="folder" onClick={addNewFolder}>
                    <div className="folder-thumbnail add-folder-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" viewBox="0 0 24 24" fill="none">
                            <rect width="24" height="24" fill="white" />
                            <path d="M12 6V18" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 12H18" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
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
                    width: 100%;
                }
                .folder {
                    margin-right: 15px;
                    margin-bottom: 50px;
                    cursor: pointer;
                }
                #new-folder {
                    margin-bottom: 5px;
                }
                .duplicated-folder {
                    margin-top: 6px;
                    margin-bottom: 12px;
                    margin-left: 3px;
                    font-size: 14px;
                    color: #F00;
                }
                .folder-thumbnail {
                    background-color: #f4f5f6;
                    border-radius: 3px;
                }
                .add-thumbnail {
                    width: 280px;
                    height: 280px;
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
                    width: 277px;
                    height: 277px;
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