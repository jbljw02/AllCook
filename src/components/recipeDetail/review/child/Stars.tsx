import { RootState } from "@/redux/store";
import { useSelector } from "react-redux"

type Params = {
    rating: number,
    onClick?: (param: number) => void,
    isUpdating: boolean, // 평점을 수정하기 위한 것인지
}

export default function Stars({ rating, onClick, isUpdating }: Params) {
    const user = useSelector((state: RootState) => state.user);
    return (
        <>
            <div className="star-div">
                {
                    Array.from({ length: 5 }, (_, index) => (
                        <div
                            key={index}
                            className={`${(user && user.name !== '') &&
                                isUpdating &&
                                user.name ?
                                'cursor-pointer' :
                                ''}
                            'star'`}
                            onClick={() => onClick &&
                                onClick(index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19px" height="19px" fill="none" viewBox="0 0 12 12">
                                {
                                    isUpdating ?
                                        <path
                                            fill={index < rating ? "#fec061" : "#e0e3e6"}
                                            strokeWidth="0.7"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m6 1 1.545 3.13 3.456.505L8.5 7.07l.59 3.44L6 8.885 2.91 10.51l.59-3.44L1 4.635l3.454-.505L6 1z">
                                        </path> :
                                        <path
                                            fill={index < rating ? "#fec061" : "#ffffff"}
                                            stroke="#fec061"
                                            strokeWidth="0.7"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m6 1 1.545 3.13 3.456.505L8.5 7.07l.59 3.44L6 8.885 2.91 10.51l.59-3.44L1 4.635l3.454-.505L6 1z">
                                        </path>
                                }
                            </svg>
                        </div>
                    ))
                }
                {
                    !isUpdating &&
                    <div className="review-score">{rating}</div>
                }
            </div >
            <style jsx>{`
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