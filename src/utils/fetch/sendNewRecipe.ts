import { Menu } from "@/redux/store"
import axios from "axios"

const sendNewRecipe = async (email: string, id: number, recipe: Menu) => {
    try {
        const data = {
            email: email,
            id: id,
            recipe: recipe,
        }
        const response = await axios.post('/api/addNewRecipe', data, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
        return response;
    } catch (error) {
        console.error("레시피 추가 실패: ", error);
    }
}

export default sendNewRecipe;