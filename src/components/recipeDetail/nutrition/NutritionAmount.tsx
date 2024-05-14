import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface ParamsType {
    value: number,
    unit: string,
}

export default function NutritionAmount({ value, unit }: ParamsType) {
    const servings = useSelector((state: RootState) => state.servings); // 레시피의 인분 수 

    return (
        <>
            <div className="nutrition-amount">
                {
                    Number.isInteger(value * servings)
                        ? (value * servings).toFixed(0)
                        : (value * servings).toFixed(1)} {unit}
            </div>
            <style jsx>{`
                .nutrition-amount {
                    margin-right: 10px;
                }
            `}</style>
        </>
    )
}