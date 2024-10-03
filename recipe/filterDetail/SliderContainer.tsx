import { NutritionKey, setNutritionInfo } from "@/redux/features/nutritionSlice";
import MultiRangeSlider from "./MultiRangeSlider";
import { useDispatch } from "react-redux";

export default function SliderContainer() {
    const dispatch = useDispatch();
    
    // RangeSlider의 파라미터를 받아와서 dispatch
    // 고차함수 - 다른 함수를 인자로 받거나 함수를 결과로 반환
    const infoChange = (name: NutritionKey) => (min: number, max: number) => {
        dispatch(setNutritionInfo({ name, values: { min, max } }));
    }

    const carInfoChange = infoChange('car');
    const engInfoChange = infoChange('eng');
    const fatInfoChange = infoChange('fat');
    const naInfoChange = infoChange('na');
    const proInfoChange = infoChange('pro');
    return (
        <>
            <span className="filter-detail-span range-span">
                탄수화물
                <div className="input-slide-container">
                    {/* key를 부여해서 슬라이더 자체를 재렌더링 시킴 */}
                    <MultiRangeSlider key={'칼로리'} min={0} max={1000} unit="g" onChange={carInfoChange} />
                </div>
            </span>
            <span className="filter-detail-span range-span">
                열량
                <div className="input-slide-container">
                    <MultiRangeSlider key={'열량'} min={0} max={1000} unit="kcal" onChange={engInfoChange} />
                </div>
            </span>
            <span className="filter-detail-span range-span">
                지방
                <div className="input-slide-container">
                    <MultiRangeSlider key={'지방'} min={0} max={1000} unit="g" onChange={fatInfoChange} />
                </div>
            </span>
            <span className="filter-detail-span range-span">
                나트륨
                <div className="input-slide-container">
                    <MultiRangeSlider key={'나트륨'} min={0} max={1000} unit="mg" onChange={naInfoChange} />
                </div>
            </span>
            <span className="filter-detail-span range-span">
                단백질
                <div className="input-slide-container">
                    <MultiRangeSlider key={'단백질'} min={0} max={1000} unit="g" onChange={proInfoChange} />
                </div>
            </span>
            <style jsx>{`
                .filter-detail-span {
                    margin-right: 14px;
                    font-size: 14px !important;
                    font-weight: 300 !important;
                    cursor: pointer;
                }
                .range-span {
                    display: block;
                    cursor: auto;
                    margin-top: 14px;
                    margin-left: 3px;
                }
                .input-slide-container {
                    margin: 12px 0 40px 1.5px;
                }
            `}</style>
        </>

    )
}