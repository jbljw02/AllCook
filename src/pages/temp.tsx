import { setAllMenu } from "@/redux/features/menuSlice";
import { wrapper } from "@/redux/store";

export default function temp() {

    return (
        <>
            <div>
                안
            </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        const API_KEY = process.env.API_KEY;

        // api 요청을 보낼 첫번째 파라미터와 두번째 파라미터를 1~1124 사이의 랜덤 정수로 생성
        // const startParam = Math.floor(Math.random() * 1121) + 1;
        // const endParam = startParam + 20;

        const startParam = 1;
        const endParam = 100;

        const response = await fetch(
            `http://openapi.foodsafetykorea.go.kr/api/
            ${API_KEY}/COOKRCP01/json/${startParam}/${endParam}`,
            {
                method: "GET",
            }
        );
        const jsonResult = await response.json();
        const result = jsonResult.COOKRCP01.row;

        store.dispatch(setAllMenu(result))

        return {
            props: {},
        };
    }
);