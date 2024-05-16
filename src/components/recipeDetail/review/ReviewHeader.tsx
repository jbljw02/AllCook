import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ReviewHeader() {
    const recipeOpinion = useSelector((state: RootState) => state.recipeOpinion);

    const [ratingAvg, setRatingAvg] = useState<number>(0);

    const calReviewAvg = () => {
        // 리뷰가 존재하지 않는다면 0으로 지정
        if (recipeOpinion.length === 0) {
            setRatingAvg(0);
        }
        // 존재한다면 평균을 계산
        else {
            let ratingSum = 0;
            recipeOpinion.map(item => ratingSum = ratingSum + item.rating)

            let avg = Number((ratingSum / recipeOpinion.length).toFixed(1));
            setRatingAvg(avg);
        }
    }

    useEffect(() => {
        calReviewAvg();
    }, [recipeOpinion]);

    return (
        <>
            <div className="review-title-section">
                <div className="review-title">리뷰</div>
                <div className="star-div">
                    <svg xmlns="http://www.w3.org/2000/svg" width="85px" height="17px" viewBox="0 0 60 12">
                        <defs>
                            {/* 소수점 점수에 해당하는 별을 위한 선형 그라데이션 정의 */}
                            {
                                Array.from({ length: 5 }).map((_, index) => {
                                    // 평균 평점이 3.5라면 3.5-3=0.5, 그러므로 0.5에 100을 곱하여 퍼센테이지를 50%로 설정
                                    // 그러나 1,2,3과 같이 소숫점 없이 떨어진다면 해당 별을 100%로 채워야 함 
                                    const fullPercentage = ratingAvg - index > 1 ? 100 : (ratingAvg - index) * 100;
                                    // 채움 비율을 0~100 사이로 제한
                                    const fillPercentage = Math.min(Math.max(fullPercentage, 0), 100);
                                    return (
                                        // 각 별에 대한 선형 그라데이션 정의. x2만 100%로 채움으로써 오른쪽으로 채워지도록 함
                                        <linearGradient id={`partialFill${index}`} x1="0" x2="100%" y1="0" y2="0" key={index}>
                                            {/* stop은 색상의 전환점을 정의. 첫번째 stop은 별이 채워질 부분, 두번째 stop은 비울 부분 */}
                                            <stop offset={`${fillPercentage}%`} stopColor="#fec061" />
                                            <stop offset={`${fillPercentage}%`} stopColor="#ffffff" />
                                        </linearGradient>
                                    );
                                })
                            }
                        </defs>
                        {
                            Array.from({ length: 5 }).map((_, index) => (
                                <path
                                    key={index}
                                    // 만약 평균 평점이 3이라면, 0~2번째 index(3번째 별까지)는 일단 완전히 채우고, 그 뒤 별의 퍼센테이지를 계산 
                                    fill={index < Math.floor(ratingAvg) ? '#fec061' : `url(#partialFill${index})`}
                                    stroke="#fec061"
                                    strokeWidth="0.7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m6 1 1.545 3.13 3.456.505L8.5 7.07l.59 3.44L6 8.885 2.91 10.51l.59-3.44L1 4.635l3.454-.505L6 1z"
                                    transform={`translate(${12 * index}, 0)`}
                                />
                            ))
                        }
                    </svg>

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