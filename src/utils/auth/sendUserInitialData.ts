import { FavoriteRecipe } from "@/redux/features/favoriteRecipeSlice";
import axios from "axios"

const sendUserInitialData = async (email: string, initialFolder: FavoriteRecipe[]) => {
    try {
        const data = {
            email: email,
            initialFolder: initialFolder,
        }
        const response = await axios.post('/api/setUserInitialData', data, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export default sendUserInitialData;