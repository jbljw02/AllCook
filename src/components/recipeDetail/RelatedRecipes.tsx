import { RootState } from "@/redux/store";
import { useCallback, useEffect, useState } from "react";
import MenuTable from "../table/MenuTable";
import moveToDetail from "@/utils/moveToDetail";
import { useDispatch, useSelector } from "react-redux";
import { setRecipe } from "@/redux/features/recipeSlice";
import { filterIngredString } from "@/utils/filterManual/filterIngredString";
import { adjustForServings } from "@/utils/filterManual/adjustForServings";
import { Menu } from "@/redux/features/menuSlice";

export default function RelatedRecipes() {
    const dispatch = useDispatch();

    const displayedMenu = useSelector((state: RootState) => state.displayedMenu);
    const allMenu = useSelector((state: RootState) => state.allMenu);
    const recipe = useSelector((state: RootState) => state.recipe); // 레시피의 상세 정보를 담고있는 state
    const servings = useSelector((state: RootState) => state.servings); // 레시피의 인분 수 

    const [relatedRecipe, setRelatedRecipe] = useState<Menu[]>([]); // 관련 레시피
    const [recipeIngredients, setRecipeIngredients] = useState(''); // 레시피의 재료

    // 특정 메뉴를 클릭하면 해당 메뉴의 레시피 페이지로 이동
    const menuClick = (name: string, seq: string) => {
        const selectedMenu = moveToDetail(name, seq, displayedMenu);
        dispatch(setRecipe(selectedMenu));
    }

    // 재료 정보에서 재료량을 제외하고 재료명만 추출
    const exportIngredientsName = (ingredArray: string[]) => {
        /* 괄호('(')가 나오면 그 전까지만 추출
        띄어쓰기(' ') 이후 괄호 혹은 숫자('0'~'9')가 나오면 그 전까지만 추출(' '는 제외하고 추출)
        문자열이 나오면 추출하지 않고 계속 진행 */
        let regex = /[^(\d]*/;

        // 재료의 양은 제외하고, 재료명만 추출
        let ingredNames: string[] = ingredArray.map(item => {
            let matched = item.match(regex);
            if (matched) {
                return matched[0].trim();
            }
            else {
                return '';
            }
        })
        return ingredNames;
    }

    // 추출한 재료명을 이용해 유사한 재료를 사용한 레시피를 찾음
    const findRelatedRecipe = useCallback((ingredNames: string[]) => {
        let recipeWithCount: { recipe: Menu, count: number }[] = [];
        let newRelatedRecipe: Menu[] = [];

        if (Array.isArray(allMenu)) {
            allMenu.forEach(recipeItem => {
                // 형식을 통일하기 위해 재료 정보를 가공
                let filteredString = filterIngredString(recipeItem);
                let ingredArray = filteredString.split(', ');
                let ingredString = exportIngredientsName(ingredArray);

                // 공통된 재료를 사용하는 레시피를 찾고, 공통분모가 되는 재료가 몇 개인지 카운트
                let commonIngred = ingredString.filter(item => ingredNames.includes(item));
                // 현재 선택된 레시피와 동일한 레시피는 제외
                if (recipe.RCP_SEQ !== recipeItem.RCP_SEQ) {
                    recipeWithCount.push({ recipe: recipeItem, count: commonIngred.length });
                }
            })
            // 겹치는 재료가 많은 순으로 내림차순 정렬
            recipeWithCount.sort((a, b) => b.count - a.count);
            // 상위 4개의 레시피만 추출하여 state 업데이트
            newRelatedRecipe = recipeWithCount.slice(0, 4).map(item => item.recipe);
            setRelatedRecipe(newRelatedRecipe);
        }
    }, [recipe, servings]);

    useEffect(() => {
        // 레시피의 재료 문자열을 가공함
        let filteredString = filterIngredString(recipe);
        // 가공한 문자열을 바탕으로 인분 수만큼 값을 조정함
        let newRecipeIngredients = adjustForServings(filteredString, servings);
        setRecipeIngredients(newRecipeIngredients);

        // 유사한 재료를 사용하는 레시피 찾기
        let ingredArray = newRecipeIngredients.split(', ')
        let ingredNames = exportIngredientsName(ingredArray);
        findRelatedRecipe(ingredNames);
    }, [recipe, servings, findRelatedRecipe]); 

    return (
        <>
            <div className="related-title">유사한 재료를 사용한 레시피</div>
            <MenuTable
                menu={relatedRecipe}
                category=""
                menuClick={menuClick}
            />
            <style jsx>{`
                .related-title {
                    font-size: 24px;
                    font-weight: 400;
                    margin-bottom: 28px;
                }
            `}</style>
        </>
    )
}