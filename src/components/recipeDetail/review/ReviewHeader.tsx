import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export default function ReviewHeader() {
    const recipeOpinion = useSelector((state: RootState) => state.recipeOpinion);

    const [ratingAvg, setRatingAvg] = useState<number>(0);

    const calReviewAvg = () => {
        // 리뷰가 존재하지 않는다면 0으로 지정
        if (recipeOpinion.length === 0) {
            setRatingAvg(0)
        }
        // 존재한다면 평균을 계산
        else {
            let ratingSum = 0;
            recipeOpinion.map(item => ratingSum = ratingSum + item.rating)

            const avg = ratingSum / recipeOpinion.length
            setRatingAvg(avg);
        }
    }

    useEffect(() => {
        calReviewAvg();
    }, [recipeOpinion]);

    console.log("이거리: ", recipeOpinion);

    return (
        <>
            <div className="review-title-section">
                <div className="review-title">리뷰</div>
                <div className="star-div">
                    {
                        Array.from({ length: 5 }, (_, index) => (
                            <div className="star">
                                <svg xmlns="http://www.w3.org/2000/svg" width="17px" height="17px" fill="none" viewBox="0 0 12 12">
                                    <path
                                        fill="#ffffff"
                                        stroke="#fec061"
                                        stroke-width="0.7"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m6 1 1.545 3.13 3.456.505L8.5 7.07l.59 3.44L6 8.885 2.91 10.51l.59-3.44L1 4.635l3.454-.505L6 1z">
                                    </path>
                                </svg>
                            </div>
                        ))
                    }
                </div>
                <div className="review-score">{ratingAvg}</div>
            </div>
            <style jsx>{`
                .review-title-section {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    padding-bottom: 20px;
                    margin-bottom: 20px;
                    border-bottom: 1px solid #e8e8e8;
                }
                .review-title {
                    font-size: 24px;
                    font-weight: 400;
                    margin-bottom: 5px;
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
            `}</style>
        </>
    )
}