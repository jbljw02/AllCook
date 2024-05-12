import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import NutritionAmount from "./NutritionAmount";

export default function NutritionBox() {
    const recipe = useSelector((state: RootState) => state.recipe); // 레시피의 상세 정보를 담고있는 state
    const servings = useSelector((state: RootState) => state.servings); // 레시피의 인분 수 

    return (
        <>
            <div className="nutrition-detail">
                <div className="nutrition-detail-nav">
                    <div className="nutrition-detail-title">레시피 영양정보</div>
                </div>
                <div className="nutrition-detail-contents-div">
                    <div className="nutrition-detail-content">
                        <div className="nutrition-name">탄수화물</div>
                        <div className="nutrition-amount">
                            <NutritionAmount
                                value={recipe.INFO_CAR}
                                unit="g"
                            />
                        </div>
                    </div>
                    <div className="nutrition-detail-content">
                        <div className="nutrition-name">열량</div>
                        <div className="nutrition-amount">
                            <NutritionAmount
                                value={recipe.INFO_ENG}
                                unit="kcal"
                            />
                        </div>
                    </div>
                    <div className="nutrition-detail-content">
                        <div className="nutrition-name">지방</div>
                        <div className="nutrition-amount">
                            <NutritionAmount
                                value={recipe.INFO_FAT}
                                unit="g"
                            />
                        </div>
                    </div>
                    <div className="nutrition-detail-content">
                        <div className="nutrition-name">나트륨</div>
                        <div className="nutrition-amount">
                            <NutritionAmount
                                value={recipe.INFO_NA}
                                unit="g"
                            />
                        </div>
                    </div>
                    <div className="nutrition-detail-content">
                        <div className="nutrition-name">단백질</div>
                        <div className="nutrition-amount">
                            <NutritionAmount
                                value={recipe.INFO_PRO}
                                unit="g"
                            />
                        </div>
                    </div>
                </div>
                <p className="nutrition-detail-footer">
                    해당 정보는 {servings}인분을 기준으로 예상되는 영양정보이며, 식재료의 생산방법, 사용량 등 기타 변수에 의해 차이가 발생할 수 있습니다.
                </p>
            </div>
            <style jsx>{`
                .nutrition-detail {
                    position: absolute;
                    display: flex;
                    flex-direction: column;
                    border: 1px solid #e8e8e8;
                    border-radius: 10px;
                    background-color: #ffffff;
                    top: 305px;
                    margin-right: 230px;
                    width: 330px;
                    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
                }
                .nutrition-detail-nav {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    padding-left: 20px;
                    border-bottom: 1px solid #b2b2b2;
                    padding-top: 17px;
                    padding-bottom: 17px;
                }   
                .nutrition-detail-contents-div {
                    display: flex;
                    flex-direction: column;
                }
                .nutrition-detail-content {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    font-size: 14px;
                    border-bottom: 1px solid #e8e8e8;
                    margin: 0 10px;
                    padding: 13px 0;
                    color: #414141;
                }
                .nutrition-name {
                    margin-left: 10px;
                }
                .nutrition-detail-footer {
                    margin-left: 18px;
                    margin-right: 18px;
                    font-weight: 300;
                    font-size: 12.5px;
                    color: #5c5c5c;
                }
            `}</style>
        </>
    )
}