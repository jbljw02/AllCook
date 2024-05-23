import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

export default function ReviewComments() {
    const recipeOpinion = useSelector((state: RootState) => state.recipeOpinion);

    return (
        <>
            {
                recipeOpinion.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            <div className='review-comments-div'>
                                <div className="comment-contents-header">
                                    <div className="user-info">
                                        <svg className="user-svg" width="28" data-bbox="0 0 22 22" data-type="shape" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 50 50">
                                            <path fill='#111111'
                                                d="M25 48.077c-5.924 0-11.31-2.252-15.396-5.921 2.254-5.362 7.492-8.267 15.373-8.267 7.889 0 13.139 3.044 15.408 8.418-4.084 3.659-9.471 5.77-15.385 5.77m.278-35.3c4.927 0 8.611 3.812 8.611 8.878 0 5.21-3.875 9.456-8.611 9.456s-8.611-4.246-8.611-9.456c0-5.066 3.684-8.878 8.611-8.878M25 0C11.193 0 0 11.193 0 25c0 .915.056 1.816.152 2.705.032.295.091.581.133.873.085.589.173 1.176.298 1.751.073.338.169.665.256.997.135.515.273 1.027.439 1.529.114.342.243.675.37 1.01.18.476.369.945.577 1.406.149.331.308.657.472.98.225.446.463.883.714 1.313.182.312.365.619.56.922.272.423.56.832.856 1.237.207.284.41.568.629.841.325.408.671.796 1.02 1.182.22.244.432.494.662.728.405.415.833.801 1.265 1.186.173.154.329.325.507.475l.004-.011A24.886 24.886 0 0 0 25 50a24.881 24.881 0 0 0 16.069-5.861.126.126 0 0 1 .003.01c.172-.144.324-.309.49-.458.442-.392.88-.787 1.293-1.209.228-.232.437-.479.655-.72.352-.389.701-.78 1.028-1.191.218-.272.421-.556.627-.838.297-.405.587-.816.859-1.24a26.104 26.104 0 0 0 1.748-3.216c.208-.461.398-.93.579-1.406.127-.336.256-.669.369-1.012.167-.502.305-1.014.44-1.53.087-.332.183-.659.256-.996.126-.576.214-1.164.299-1.754.042-.292.101-.577.133-.872.095-.89.152-1.791.152-2.707C50 11.193 38.807 0 25 0"></path>
                                        </svg>
                                        <div className="user-name">{item.name}</div>
                                    </div>
                                    <div className="star-div">
                                        {
                                            Array.from({ length: 5 }, (_, localIndex) => (
                                                <div
                                                    key={localIndex}
                                                    className="star">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="17px" height="17px" fill="none" viewBox="0 0 12 12">
                                                        <path
                                                            fill={localIndex < item.rating ? '#fec061' : '#ffffff'}
                                                            stroke="#fec061"
                                                            strokeWidth="0.7"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="m6 1 1.545 3.13 3.456.505L8.5 7.07l.59 3.44L6 8.885 2.91 10.51l.59-3.44L1 4.635l3.454-.505L6 1z">
                                                        </path>
                                                    </svg>
                                                </div>
                                            ))
                                        }
                                        <div className="review-score">{item.rating}</div>
                                    </div>
                                </div>
                                <div className="review-comment">{item.comment}</div>
                            </div>
                        </React.Fragment>
                    )
                })
            }
            <style jsx>{`
                .review-comments-div {
                    display: flex;
                    flex-direction: column;
                    border-radius: 5px;
                    font-size: 15px;
                    padding: 20px 10px 40px 10px;
                    margin-top: 20px;
                    border-bottom: 1px solid #e8e8e8;
                }
                .no-comments {
                    border-bottom: none;
                    padding-bottom: 0px;
                }
                .review-comments-div:last-child {
                    {/* border-bottom: none; */}
                }
                .comment-contents-header {
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
                .review-score {
                    font-size: 14px;
                    margin-left: 5px;
                }
                .review-comment {
                    margin-top: 8px;
                    margin-left: 37px;
                    font-weight: 300;
                    font-size: 15px;
                }   
            `}</style>
        </>
    )
}