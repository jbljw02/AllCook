import axios from "axios"
import { Menu } from "@/redux/features/menuSlice"

const sendNewRecipe = async (email: string, id: number, recipe: Menu) => {
    try {
        const data = {
            email: email,
            id: id,
            recipe: recipe,
        }
        const response = await axios.post('/api/userFavorite/recipe/addNewRecipe', data, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
        return response;
    } catch (error) {
        throw error;
    }
}

export default sendNewRecipe;