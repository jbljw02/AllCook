import { setAllMenu, setDessertMenu } from "@/redux/features/menuSlice";
import { Menu, wrapper } from "@/redux/store";
import axios from "axios";
import Image from "next/image";

type paramsType = {
    menu: Menu[],
    menuHovered: boolean[],
    menuClick: (name: string, seq: string) => void,
    imgMouseEnter: (index: number, param: string) => void,
    imgMouseOut: (index: number, param: string) => void,
}

export const RecomMenu: React.FC<paramsType> = ({ menu, menuHovered, menuClick, imgMouseEnter, imgMouseOut }) => {

    return (
        <table className="menu-table">
            <tbody>
                <tr>
                    {
                        menu.length !== undefined &&
                        menu.slice(0, 4).map((item, index) => {
                            const isHovered = menuHovered;
                            return (
                                <td>
                                    <div>
                                        <div onClick={() => menuClick(item.RCP_NM, item.RCP_SEQ)} className="td-content">
                                            <Image
                                                src={`${item.ATT_FILE_NO_MK}`}
                                                style={{
                                                    borderRadius: 8,
                                                    cursor: "pointer",
                                                    transition: "transform 0.3s ease",
                                                    transform: isHovered[index]
                                                        ? "scale(1.05)"
                                                        : "scale(1)"
                                                }}
                                                width={250}
                                                height={250}
                                                alt={""}
                                                onMouseEnter={() => imgMouseEnter(index, "dessert")}
                                                onMouseLeave={() => imgMouseOut(index, "dessert")}
                                            />
                                        </div>
                                        <div className="RCP_NM">{item.RCP_NM}</div>
                                        <div className="RCP_PAT2">{item.RCP_PAT2}</div>
                                    </div>
                                </td>
                            );
                        })}
                </tr>
            </tbody>
        </table>
    )
}


export const getStaticProps = wrapper.getStaticProps(
    (store) => async () => {
        const API_KEY = process.env.API_KEY;

        function findEfficientRandomRangeWithFourNumbers(numbers: number[]) {
            // 결과를 저장할 배열
            let minimalRanges = [];

            for (let i = 0; i <= numbers.length - 4; i++) { // 최소 네 개의 숫자가 필요하므로, 길이 - 4까지 반복
                let start = numbers[i];
                let end = numbers[i + 3]; // 시작점에서 세 칸 뒤의 숫자가 네 번째 숫자가 됨

                // 이 범위는 항상 네 개의 숫자를 포함함
                minimalRanges.push([start, end]);
            }

            if (minimalRanges.length === 0) {
                return "적절한 범위를 찾을 수 없습니다.";
            }

            // 무작위로 하나의 범위 선택
            const randomIndex = Math.floor(Math.random() * minimalRanges.length);
            return minimalRanges[randomIndex];
        }

        const dessertArray = [15, 29, 56, 70, 141, 215, 221, 226, 244, 246, 247, 250, 300, 301, 306, 313, 389, 390, 397, 430, 451, 452, 481, 487, 493, 504, 543, 581, 582, 583, 620, 725, 726, 727, 742, 749, 765, 769, 781, 782, 783, 784, 785, 786, 787, 788, 789, 790, 795, 822, 827, 834, 844, 845, 846, 847, 848, 849, 850, 851, 852, 867, 869, 884, 904, 908, 916, 925, 926, 927, 928, 929, 930, 931, 973, 974, 984, 987, 995, 996, 997, 998, 999, 1000];
        const arrayResult = findEfficientRandomRangeWithFourNumbers(dessertArray);
        // console.log("첫 인덱스 : ", arrayResult[0]);
        // console.log("마지막 인덱스 : ", arrayResult[1]);
        console.log("배배 : ", arrayResult);

        try {
            const response = await axios.get(`http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/json/${arrayResult[0]}/${arrayResult[1]}`);
            const result = response.data.COOKRCP01.row;
            console.log("결과임 : ", result);
            store.dispatch(setDessertMenu(result));

        } catch (error) {
            console.log("API 호출 실패 : ", error);
        }

        return {
            props: {},
        }
    }
)