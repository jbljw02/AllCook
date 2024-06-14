import { setRecipeOpinion, sortRecipeOpinionAsc, sortRecipeOpinionDesc } from "@/redux/features/recipeOpinionSlice";
import { RootState } from "@/redux/store";
import axios from "axios";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NProgress from "nprogress";
import UserProfile from "./child/UserProfile";
import TextArea from "./child/TextArea";
import Stars from "./child/Stars";

export default function ReviewComments() {
    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.user);
    const recipe = useSelector((state: RootState) => state.recipe);
    const recipeOpinion = useSelector((state: RootState) => state.recipeOpinion);

    // 오름차순(등록순 정렬)
    const clickAsc = () => {
        dispatch(sortRecipeOpinionAsc());
    }

    // 내림차순(최신순 정렬)
    const clickDesc = () => {
        dispatch(sortRecipeOpinionDesc());
    }

    // 컴포넌트가 마운트 될 때 정렬 기준에 따라 댓글을 정렬
    useEffect(() => {
        if (recipeOpinion.sortRule === '등록순') {
            clickAsc();
        }
        if (recipeOpinion.sortRule === '최신순') {
            clickDesc();
        }
    }, [recipeOpinion, dispatch]);

    const requestRecipeOpinion = useCallback(async (RCP_SEQ: string) => {
        try {
            const data = {
                RCP_SEQ: RCP_SEQ,
            }

            if (!data.RCP_SEQ) {
                return;
            }

            const response = await axios.post('/api/recipeOpinion/reciveRecipeOpinion', data, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            });

            // 레시피에 댓글이 없을 때
            if ((response.data.opinions).length === 0) {
                dispatch(setRecipeOpinion([]));
            }
            // 레시피에 댓글이 있을 때
            else {
                dispatch(setRecipeOpinion(response.data.opinions));
            }
        } catch (error) {
            throw error;
        }
    }, [user, recipe]);

    // 댓글 삭제 요청
    const recipeDeleteRequest = async (id: string) => {
        try {
            NProgress.start();

            const data = {
                RCP_SEQ: recipe.RCP_SEQ,
                id: id,
                comment: editedInput
            }

            // 댓글을 삭제
            await axios.post('/api/recipeOpinion/deleteRecipeOpinion', data, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            });
            // 댓글을 받아옴
            await requestRecipeOpinion(recipe.RCP_SEQ);
        } catch (error) {
            throw error;
        } finally {
            NProgress.done();
        }
    }

    // 댓글을 개별적으로 관리하기 위해 key-value 형식으로 지정
    const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
    const [editedInput, setEditedInput] = useState<string>('');
    const [editingRating, setEditingRating] = useState<number>(0);

    // 수정 작업 시작 및 종료
    const editingOn = (id: string) => {
        // 수정 댓글을 우선 해당 ID의 댓글로 변경
        const targetOpinion = recipeOpinion.opinions.find(item => item.id === id);
        if (targetOpinion) {
            setEditedInput(targetOpinion.comment)
            setEditingRating(targetOpinion.rating)
        }
        setIsEditing((prevState) => ({
            ...prevState,
            [id]: true,
        }));
    }
    const editingOff = (id: string) => {
        setEditedInput('');
        setIsEditing({});
        setEditingRating(0);
    }

    const commentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (user.name) {
            setEditedInput(e.target.value);
        }
    }

    const handleRating = (index: number) => {
        if (user.name) {
            setEditingRating(index + 1);
        }
    }

    // 댓글 수정 요청
    const recipeEditRequest = async (id: string) => {
        try {
            NProgress.start();

            const data = {
                RCP_SEQ: recipe.RCP_SEQ,
                id: id,
                comment: editedInput,
                rating: editingRating,
            }

            // 댓글을 수정
            await axios.post('/api/recipeOpinion/editRecipeOpinion', data, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            });
            // 댓글을 받아옴    
            await requestRecipeOpinion(recipe.RCP_SEQ);

            editingOff(id); // 수정 작업을 마침
        } catch (error) {
            throw error;
        } finally {
            NProgress.done();
        }
    }

    return (
        <>
            {
                recipeOpinion.opinions.length > 0 &&
                <div className="comments-sort-rule">
                    <div>
                        <span
                            className="cursor-pointer"
                            onClick={clickAsc}
                            style={{ color: recipeOpinion.sortRule === '등록순' ? '#111111' : '#cdcdcd' }}>
                            등록순
                        </span>
                        <span
                            className="cursor-pointer"
                            onClick={clickDesc}
                            style={{ color: recipeOpinion.sortRule === '최신순' ? '#111111' : '#cdcdcd' }}>
                            최신순
                        </span>
                    </div>
                </div>
            }
            {
                recipeOpinion.opinions.map((item, index) => {
                    const timeStamp = item.dateTime;
                    // 타임 스탬프로 DB에 저장되어 있던 값을 Date 형식으로 변경
                    const dateTime = new Date(timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1000000);

                    const hours = dateTime.getHours().toString().padStart(2, '0');
                    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
                    const formattedTime = `${hours}:${minutes}`;
                    return (
                        <React.Fragment key={index}>
                            <div className='review-comments-div'>
                                <div className="comment-contents-header">
                                    <UserProfile name={item.name} />
                                    <Stars
                                        rating={isEditing[item.id] ? editingRating : item.rating}
                                        onClick={handleRating}
                                        isUpdating={isEditing[item.id] ? true : false}
                                    />
                                </div>
                                {
                                    isEditing[item.id] ?
                                        // 댓글이 수정중일 때
                                        <>
                                            <TextArea
                                                value={editedInput}
                                                onChange={commentChange}
                                            />
                                            <div className="editing-footer">
                                                <button
                                                    className="edit"
                                                    onClick={() => recipeEditRequest(item.id)}>
                                                    수정
                                                </button>
                                                <button
                                                    className="cancel"
                                                    onClick={() => editingOff(item.id)}>
                                                    취소
                                                </button>
                                            </div>
                                        </> :
                                        // 댓글을 표시중일 때(초기값)
                                        <>
                                            <div className="review-comment">{item.comment}</div>
                                            <div className="review-footer-div">
                                                <div className="review-dateTime">
                                                    {dateTime.getFullYear()}.
                                                    {dateTime.getMonth() + 1}.
                                                    {dateTime.getDate()}&nbsp;
                                                    {formattedTime}
                                                    {
                                                        item.isEdited &&
                                                        <span>(수정됨)</span>
                                                    }
                                                </div>
                                                {
                                                    item.email === user.email &&
                                                    <div className="btn-div">
                                                        <button
                                                            className="modify"
                                                            onClick={() => editingOn(item.id)}>
                                                            수정
                                                        </button>
                                                        <button
                                                            onClick={() => recipeDeleteRequest(item.id)}
                                                            className="delete">
                                                            삭제
                                                        </button>
                                                    </div>
                                                }
                                            </div>
                                        </>

                                }
                            </div>
                        </React.Fragment>
                    )
                })
            }
            <style jsx> {`
                .comments-sort-rule {
                    display: flex;
                    width: 100%;
                    margin-top: 15px;
                    margin-left: 3px;
                    font-size: 13.5px;
                }
                .comments-sort-rule span{
                    margin-right: 7px;
                }
                .comments-sort-rule span:last-child {
                    color: #cdcdcd;
                }
                .review-comments-div {
                    display: flex;
                    flex-direction: column;
                    border-radius: 5px;
                    font-size: 15px;
                    padding: 15px 10px 30px 10px;
                    margin-top: 20px;
                    border-bottom: 1px solid #e8e8e8;
                }
                .no-comments {
                    border-bottom: none;
                    padding-bottom: 0px;
                }
                .comment-contents-header {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                }
                .editing-footer {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                    margin-top: 17px;
                }
                .editing-footer button {
                    border-radius: 5px;
                    font-size: 13px;
                    cursor: pointer;
                    padding: 5px 12px;
                }
                .edit {
                    color: #ffffff;
                    background-color: #002312;
                    margin-right: 10px;
                }
                .cancel {
                    color: #111111;
                    background-color: #ffffff;
                    border: 1px solid #e8e8e8;
                }
                .review-comment {
                    margin-top: 8px;
                    margin-left: 37px;
                    font-weight: 300;
                    font-size: 15px;
                }   
                .review-footer-div {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                }
                .review-dateTime {
                    margin-top: 10px;
                    margin-left: 37px;
                    font-weight: 300;
                    font-size: 13.5px;
                    color: #a9a9a9;
                }
                .review-dateTime span {
                    margin-left: 3px;
                }
                .btn-div button {
                    border-radius: 5px;
                    font-size: 13px;
                    background-color: #ffffff;
                    cursor: pointer;
                    padding: 0px;
                }
                .btn-div button:hover {
                    text-decoration: underline;
                }
                .modify {
                    color: #111111;
                    margin-right: 12px;
                }
                .delete {
                    color: #ff4343;
                }
            `}</style>
        </>
    )
}