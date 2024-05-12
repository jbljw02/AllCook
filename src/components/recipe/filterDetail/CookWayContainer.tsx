import { useDispatch, useSelector } from "react-redux";
import CookWay from "./checkbox/CookWay";
import { RootState } from "@/redux/store";
import { setCookWay } from "@/redux/features/cookWaySlice";

export default function CookWayContainer() {
    const dispatch = useDispatch();
    
    const cookWay = useSelector((state: RootState) => state.cookWay);

    // 요리 방법의 체크 여부를 토글
    const changeCookCheck = (event: { target: { name: string; checked: boolean; }; }) => {
        dispatch(setCookWay({
            ...cookWay,
            [event.target.name]: event.target.checked,
        }))
    }

    return (
        <>
            <span className="filter-detail-span">
                <CookWay
                    cookWayName="steam"
                    isChecked={cookWay.steam}
                    changeCookCheck={changeCookCheck}
                />
            </span>
            <span className="filter-detail-span">
                <CookWay
                    cookWayName="boil"
                    isChecked={cookWay.boil}
                    changeCookCheck={changeCookCheck}
                />
            </span>
            <span className="filter-detail-span">
                <CookWay
                    cookWayName="grill"
                    isChecked={cookWay.grill}
                    changeCookCheck={changeCookCheck}
                />
            </span>
            <span className="filter-detail-span">
                <CookWay
                    cookWayName="stir"
                    isChecked={cookWay.stir}
                    changeCookCheck={changeCookCheck}
                />
            </span>
            <span className="filter-detail-span">
                <CookWay
                    cookWayName="fry"
                    isChecked={cookWay.fry}
                    changeCookCheck={changeCookCheck}
                />
            </span>
            <span className="filter-detail-span">
                <CookWay
                    cookWayName="etc"
                    isChecked={cookWay.etc}
                    changeCookCheck={changeCookCheck}
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