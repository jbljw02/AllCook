import axios from "axios";
import { Menu } from "@/redux/features/menuSlice";

const recipeDeleteRequest = async (email: string, folderId: number, recipe: Menu | string[]) => {
    try {
        const data = {
            email: email,
            folderId: folderId,
            recipe: recipe,
        }
        const response = await axios.post('/api/userFavorite/recipe/deleteRecipe', data, {
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

export default recipeDeleteRequest;