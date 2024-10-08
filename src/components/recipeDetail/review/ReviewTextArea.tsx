import { addOpinion, setRecipeOpinion, sortRecipeOpinionAsc, sortRecipeOpinionDesc } from "@/redux/features/recipeOpinionSlice";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, ChangeEvent, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import NProgress from "nprogress";
import UserProfile from "./child/UserProfile";
import TextArea from "./child/TextArea";
import Stars from "./child/Stars";
import { Timestamp } from "firebase/firestore";

export default function ReviewTextArea() {
    const dispatch = useDispatch();
    const router = useRouter();

    const user = useSelector((state: RootState) => state.user);

    const recipe = useSelector((state: RootState) => state.recipe);
    const recipeOpinion = useSelector((state: RootState) => state.recipeOpinion);

    // 레시피의 별점을 관리
    const [rating, setRating] = useState<number>(0);

    const handleRating = (index: number) => {
        if (user.name) {
            setRating(index + 1);
        }
    }

    const [formData, setFormData] = useState({
        comment: '',
        submitted: false,
    });

    const commentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (user.name) {
            setFormData((prevData) => ({
                ...prevData,
                comment: e.target.value
            }));
        }
    }

    // 레시피에 대한 댓글 정보를 받음
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

    const [sendLoading, setSendLoading] = useState(false);

    // 레시피에 대한 댓글 및 평점을 업데이트
    const sendNewRecipeOpinion = async () => {
        try {
            setSendLoading(true);

            NProgress.start();

            const data = {
                email: user.email,
                name: user.name,
                comment: formData.comment,
                rating: rating,
                RCP_SEQ: recipe.RCP_SEQ,
                dateTime: new Date().toISOString(),
                isEdited: false,
            }

            // 새 댓글을 전송
            await axios.post('/api/recipeOpinion/addNewRecipeOpinion', data, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            });

            // 출력은 타임스탬프 형식으로 해야하므로 변경
            dispatch(addOpinion({
                ...data,
                dateTime: Timestamp.fromDate(new Date(data.dateTime)), // `Timestamp`로 변환
            }));

            setSendLoading(false);
            setFormData((prevData) => ({
                ...prevData,
                comment: '',
            }));
            setRating(0);
        } catch (error) {
            throw error;
        } finally {
            NProgress.done();
        }
    }

    const formSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault(); // form의 기본 동작을 막음(조건이 만족해야 전송되도록)
        console.log("DKDKDKDK");

        if (formData.comment !== '' && rating !== 0) {
            // 모든 항목이 공란이 아닐 때에만 요청 전송
            sendNewRecipeOpinion();

            setFormData((prevData) => ({
                ...prevData,
                submitted: false
            }));
        }
        // 댓글을 입력하지 않았을 경우
        else {
            setFormData((prevData) => ({
                ...prevData,
                submitted: true
            }));
        }
    }

    useEffect(() => {
        requestRecipeOpinion(recipe.RCP_SEQ);
    }, [user, recipe, requestRecipeOpinion]);

    return (
        <>
            <div className={`review-write-div ${recipeOpinion.opinions.length === 0 ? 'no-comments' : ''}`}>
                <div className="review-contents-header">
                    {
                        !user || (user.name === '' && user.email === '') ?
                            // 로그아웃 상태일 때
                            <div
                                className="user-info cursor-pointer"
                                onClick={() => { router.push('/signIn') }}>
                                <svg className="user-svg" width="28" data-bbox="0 0 22 22" data-type="shape" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 50 50">
                                    <path fill='#111111'
                                        d="M25 48.077c-5.924 0-11.31-2.252-15.396-5.921 2.254-5.362 7.492-8.267 15.373-8.267 7.889 0 13.139 3.044 15.408 8.418-4.084 3.659-9.471 5.77-15.385 5.77m.278-35.3c4.927 0 8.611 3.812 8.611 8.878 0 5.21-3.875 9.456-8.611 9.456s-8.611-4.246-8.611-9.456c0-5.066 3.684-8.878 8.611-8.878M25 0C11.193 0 0 11.193 0 25c0 .915.056 1.816.152 2.705.032.295.091.581.133.873.085.589.173 1.176.298 1.751.073.338.169.665.256.997.135.515.273 1.027.439 1.529.114.342.243.675.37 1.01.18.476.369.945.577 1.406.149.331.308.657.472.98.225.446.463.883.714 1.313.182.312.365.619.56.922.272.423.56.832.856 1.237.207.284.41.568.629.841.325.408.671.796 1.02 1.182.22.244.432.494.662.728.405.415.833.801 1.265 1.186.173.154.329.325.507.475l.004-.011A24.886 24.886 0 0 0 25 50a24.881 24.881 0 0 0 16.069-5.861.126.126 0 0 1 .003.01c.172-.144.324-.309.49-.458.442-.392.88-.787 1.293-1.209.228-.232.437-.479.655-.72.352-.389.701-.78 1.028-1.191.218-.272.421-.556.627-.838.297-.405.587-.816.859-1.24a26.104 26.104 0 0 0 1.748-3.216c.208-.461.398-.93.579-1.406.127-.336.256-.669.369-1.012.167-.502.305-1.014.44-1.53.087-.332.183-.659.256-.996.126-.576.214-1.164.299-1.754.042-.292.101-.577.133-.872.095-.89.152-1.791.152-2.707C50 11.193 38.807 0 25 0"></path>
                                </svg>
                                <div
                                    className="user-name"
                                    onClick={() => router.push('/signIn')}>
                                    로그인
                                </div>
                            </div> :
                            // 로그인 상태일 때
                            <UserProfile name={user.name} />
                    }
                    <Stars
                        rating={rating}
                        onClick={handleRating}
                        isUpdating={true}
                    />
                </div>
                <form>
                    <TextArea
                        value={formData.comment}
                        onChange={commentChange}
                        placeholder={`${(user && user.name !== '') &&
                            user.name ?
                            '이 레시피에 대한 의견을 자유롭게 남겨주세요!' :
                            '로그인하고 댓글을 남겨보세요!'}`}
                    />
                    {
                        formData.submitted && rating === 0 && formData.comment !== '' ?
                            <div className="rating-warning">레시피를 별점으로 평가해주세요!</div> :
                            null
                    }
                    <button
                        className={`${formData.comment === '' || sendLoading ?
                            'button-disable' :
                            'button-activation cursor-pointer'}`}
                        onClick={formSubmit}
                        disabled={formData.comment === '' || sendLoading}>
                        작성하기
                    </button>
                </form>
            </div>
            <style jsx>{`
                .review-write-div {
                    display: flex;
                    flex-direction: column;
                    padding-bottom: 40px;
                    border-bottom: 1px solid #e8e8e8;
                }
                .review-contents-header {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                }
                .user-info {
                    display: flex;
                    flex-direction: row;
                }
                .user-svg {
                    bottom: 2px;
                }
                .user-name {
                    margin-left: 30px;
                    font-size: 17px;
                }
                .star-div {
                    display: flex;
                    flex-direction: row;
                    margin-left: 17px;
                    margin-top: 3px;
                }
                .star {
                    margin-top: 1px;
                }
                form {
                    width: 100%;
                }
                .rating-warning {
                    margin-top: 10px;
                    margin-left: 3px;
                    font-size: 12px;
                    color: #f00;
                }
                .button-activation {
                    width: 100%;
                    background-color: #002312;
                    color: #ffffff;
                    padding: 15px 20px;
                    margin-top: 22px;
                    border: 1px solid transparent;
                    border-radius: 10px;
                    font-size: 15px;
                }
                .button-disable {
                    width: 100%;
                    background-color: #f2f2f2;
                    color: #838383;
                    padding: 15px 20px;
                    margin-top: 22px;
                    border: 1px solid transparent;
                    border-radius: 10px;
                    font-size: 15px;
                }
            `}</style>
        </>
    )
}