import { NutritionKey, setNutritionInfo } from "@/redux/features/nutritionSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { searchByKey, searchByRange } from "@/utils/filterMenu";
import { setDisplayedMenu } from "@/redux/features/menuSlice";
import { setCurrentPage } from "@/redux/features/recipePageSlice";
import { setFoodType } from "@/redux/features/foodTypeSlice";
import { setCookWay } from "@/redux/features/cookWaySlice";
import FoodTypeContainer from "./FoodTypeContainer";
import CookWayContainer from "./CookWayContainer";
import SliderContainer from "./SliderContainer";

export default function FilterDetail() {
    const dispatch = useDispatch();

    const allMenu = useSelector((state: RootState) => state.allMenu);
    const nutritionInfo = useSelector((state: RootState) => state.nutritionInfo);

    // 음식의 종류, 요리 방법을 담는 state들 
    const foodType = useSelector((state: RootState) => state.foodType);
    const cookWay = useSelector((state: RootState) => state.cookWay);

    // 필터를 적용하여 검색
    const searchByFilter = () => {
        // Object.entries = 객체의 키, 값 쌍을 배열로 반환
        // ex) ['sideDish', false], ['specialDish', true]...
        // ([]) = 배열 구조 분해 할당 => 각 위치에 있는 요소를 파라미터에 할당
        const foodTypeEntries = Object.entries(foodType).filter(([key, value]) => value === true);
        const cookWayEntries = Object.entries(cookWay).filter(([key, value]) => value === true);

        let filteredMenu = allMenu;

        // 값이 true인 경우가 없을 때(선택된 항목이 없는 경우)는 기존 메뉴로 되돌림
        if (foodTypeEntries.length === 0 && cookWayEntries.length === 0) {
            filteredMenu = allMenu;
        }
        // 음식의 종류만 선택된 경우
        else if (foodTypeEntries.length !== 0 && cookWayEntries.length === 0) {
            filteredMenu = searchByKey(foodTypeEntries, 'RCP_PAT2', allMenu);
        }
        // 요리 방법만 선택된 경우
        else if (foodTypeEntries.length === 0 && cookWayEntries.length !== 0) {
            filteredMenu = searchByKey(cookWayEntries, 'RCP_WAY2', allMenu);
        }
        // 음식의 종류, 요리 방법 모두 선택된 경우
        else if (foodTypeEntries.length !== 0 && cookWayEntries.length !== 0) {
            filteredMenu = searchByKey(foodTypeEntries, 'RCP_PAT2', allMenu);
            filteredMenu = searchByKey(cookWayEntries, 'RCP_WAY2', filteredMenu);
        }

        let finalFilteredMenu = searchByRange(filteredMenu, nutritionInfo);
        dispatch(setDisplayedMenu(finalFilteredMenu)); // 최종 분류 결과를 dispatch
        dispatch(setCurrentPage(1)); // 화면에 출력되는 메뉴가 변경되었기 때문에 페이지를 초기 상태로 돌림
    }

    // 체크박스를 모두 해제
    const unCheck = () => {
        // foodType의 키를 배열로 만듦
        // reduce = 배열의 값을 누적시킴. ex) [1,2,3,4] = 1+2, 3+3, 6+4
        // 각 키에 대해서 false로 만들고, 다음 반복에서 그 값을 유지시키고 다음 키에 대한 값을 또 false로 만듦
        dispatch(setFoodType(Object.keys(foodType).reduce((prev, key) => {
            return { ...prev, [key]: false };
        }, { sideDish: false, specialDish: false, stew: false, dessert: false, rice: false })));
        dispatch(setCookWay(Object.keys(cookWay).reduce((prev, key) => {
            return { ...prev, [key]: false };
        }, { steam: false, boil: false, grill: false, stir: false, fry: false, etc: false })));

        Object.keys(nutritionInfo).forEach((key: string) => {
            dispatch(setNutritionInfo({ name: key as NutritionKey, values: { min: 0, max: 1000 } }));
        })
    }

    return (
        <>
            <div className="filter-detail">
                <div className="filter-checkbox-div">
                    <div className="filter-detail-category">음식의 종류</div>
                    <div className="filter-detail-div">
                        <FoodTypeContainer />
                    </div>
                    <div className="filter-detail-category">요리 방법</div>
                    <div className="filter-detail-div">
                        <CookWayContainer />
                    </div>
                    <div className="filter-detail-category">영양성분</div>
                    <div className="filter-detail-div">
                        <SliderContainer />
                    </div>
                </div>
                <div className="filter-submit">
                    {/* filter-button-div 하위에 존재하기 때문에 이벤트 버블링 발생 - 막도록 설정 */}
                    <div onClick={searchByFilter}>필터 적용하기</div>
                    <div onClick={unCheck}>필터 지우기</div>
                </div>
            </div>
            <style jsx>{`
                .filter-detail { 
                    position: absolute;
                    display: flex;
                    flex-direction: column;
                    top: 175px;
                    margin-right: 360px;
                    padding: 30px 40px 30px 40px;
                    border: 1px solid #e8e8e8;
                    border-radius: 10px;
                    background-color: #ffffff;
                    cursor: auto;
                    z-index: 1000;
                    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
                }
                .filter-checkbox-div {
                    padding-bottom: 40px;
                    border-bottom: 1px solid #e8e8e8;
                }
                .filter-detail-category:first-child {
                    margin-top: 0px;
                } 
                .filter-detail-category {
                    font-size: 15px;
                    margin-top: 25px;
                    margin-bottom: 7px;
                    font-weight: 500;
                }
                .filter-detail-div {
                    margin-left: -2px;
                }
                .filter-submit {
                    display: flex;  
                    flex-direction: row;
                    margin-top: 45px;
                    font-size: 13.5px;
                }
                .filter-submit div {
                    margin-right: 20px;
                    padding: 5px 10px 5px 10px;
                    border: 1px solid #e8e8e8;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: border-color 0.3s ease;
                }
                .filter-submit div:hover {
                    border-color: rgb(130, 130, 130);
                }
            `}</style>
        </>

    )

}