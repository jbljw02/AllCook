import { useDispatch, useSelector } from "react-redux";
import FoodType from "./checkbox/FoodType";
import { setFoodType } from "@/redux/features/foodTypeSlice";
import { RootState } from "@/redux/store";


export default function FoodTypeContainer() {
    const dispatch = useDispatch();

    const foodType = useSelector((state: RootState) => state.foodType);

    // 음식의 종류 체크 여부를 토글
    const changeFoodCheck = (event: { target: { name: string; checked: boolean; }; }) => {
        console.log(event.target.name);
        dispatch(setFoodType({
            ...foodType,  // 다른 요소는 그대로 유지
            [event.target.name]: event.target.checked,  // 파라미터로 받은 요소의 체크 여부를 토글
        }))
    }

    return (
        <>
            <span className="filter-detail-span">
                <FoodType
                    foodTypeName="rice"
                    isChecked={foodType.rice}
                    changeFoodCheck={changeFoodCheck}
                />
            </span>
            <span className="filter-detail-span">
                <FoodType
                    foodTypeName="sideDish"
                    isChecked={foodType.sideDish}
                    changeFoodCheck={changeFoodCheck}
                />
            </span>
            <span className="filter-detail-span">
                <FoodType
                    foodTypeName="specialDish"
                    isChecked={foodType.specialDish}
                    changeFoodCheck={changeFoodCheck}
                />
            </span>
            <span className="filter-detail-span">
                <FoodType
                    foodTypeName="stew"
                    isChecked={foodType.stew}
                    changeFoodCheck={changeFoodCheck}
                />
            </span>
            <span className="filter-detail-span">
                <FoodType
                    foodTypeName="dessert"
                    isChecked={foodType.dessert}
                    changeFoodCheck={changeFoodCheck}
                />
            </span>
            <style jsx>{`
                .filter-detail-span {
                    margin-right: 14px;
                    font-size: 14px !important;
                    font-weight: 300 !important;
                    cursor: pointer;
                }
            `}</style>
        </>
    )
}