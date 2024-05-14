import ReviewHeader from "./ReviewHeader";
import ReviewTextArea from "./ReviewTextArea";
import ReviewComments from "./ReviewComments";

export default function ReviewContainer() {
    return (
        <>
            <div className="review-container">
                {/* 리뷰 헤더 */}
                <ReviewHeader />
                {/* 리뷰 작성란과 리뷰 목록들을 보이는 영역 */}
                <div className="review-contents-section">
                    {/* 리뷰 작성란 */}
                    <ReviewTextArea />
                    {/* 리뷰 목록 */}
                    <ReviewComments />
                </div>
            </div>
            <style jsx>{`
                .review-container {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    margin-bottom: 80px;
                }
                .review-contents-section {
                    margin-left: 7px;
                    width: 500px;
                }
            `}</style>
        </>
    )
}