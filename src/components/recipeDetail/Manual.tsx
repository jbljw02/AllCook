import { Menu, RootState } from "@/redux/store";
import { adjustForServings } from "@/utils/filterManual/adjustForServings";
import { filterIngredString } from "@/utils/filterManual/filterIngredString";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export default function Manual() {
    const recipe = useSelector((state: RootState) => state.recipe); // 레시피의 상세 정보를 담고있는 state
    const servings = useSelector((state: RootState) => state.servings); // 레시피의 인분 수

    const [recipeManual, setRecipeManual] = useState<string[]>([]); // 레시피의 요리 방법

    // 레시피의 메뉴얼을 가공하여 state에 할당
    const pushManual = (recipe: Menu) => {
        let manuals: string[] = [];

        // 메뉴얼의 순서를 정렬하여 반복
        Object.keys(recipe)
            .sort()
            .forEach(key => {
                // 메뉴얼의 요소이면서, 비어있지 않아야 함
                if (key.startsWith("MANUAL") && recipe[key] !== '' && !key.startsWith("MANUAL_IMG")) {
                    manuals.push(recipe[key] as string);
                }
            })
        // '1.', '2.'와 같은 문자열들을 제거
        manuals = manuals.map(item => item.replace(/^\d+\. /, ''));
        setRecipeManual(manuals)
    }

    useEffect(() => {
        pushManual(recipe);
    }, [recipe, servings]);

    return (
        <>
            <div className="manual-title">요리 방법</div>
            {
                recipeManual.map((item, index) => {
                    return (
                        <div className="manual-main">
                            <div className="manual-index">0{index + 1}/0{recipeManual.length}</div>
                            <div className="manual-detail">{item.replace(/[a-zA-Z]$/, '')}</div>
                        </div>
                    )
                })
            }
            <style jsx>{`
                .manual-title {
                    font-size: 24px;
                    font-weight: 400;
                    margin-bottom: 5px;
                }
                .manual-main {
                    margin-top: 15px;
                    padding: 20px 30px 20px 15px;
                    border: 1px solid #e8e8e8;
                    border-radius: 5px;
                    width: 650px;
                }
                .manual-index {
                    color: #5C5C5C;
                    font-size: 13px;
                    margin-bottom: 5px;
                }
                .manual-detail {
                    font-size: 16px;
                }
            `}</style>
        </>
    )
}