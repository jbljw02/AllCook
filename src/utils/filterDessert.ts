import { Menu } from "@/redux/store";

export default function filterDessert(recipes: Menu[], category: string) {
    let result;

    // 인자가 '후식'이라면 후식만 걸러냄
    if (category === '후식') {
        result = recipes.filter(item => {
            if (item.RCP_PAT2 === '후식') {
                return true;
            } else {
                return false;
            }
        })
    }
    // 인자가 '후식'이 아니라면 다른 카테고리만 걸러냄 
    if (category !== '후식') {
        result = recipes.filter(item => {
            if (item.RCP_PAT2 !== '후식') {
                return true;
            } else {
                return false;
            }
        })
    }

    return result;
}