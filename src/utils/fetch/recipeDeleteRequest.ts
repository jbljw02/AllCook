import { Menu } from "@/redux/store";
import axios from "axios";

const recipeDeleteRequest = async (email: string, folderId: number, recipe: Menu | string[]) => {
    try {
        const data = {
            email: email,
            folderId: folderId,
            recipe: recipe,
        }
        const response = await axios.post('/api/deleteRecipe', data, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
        console.log("레시피 삭제 성공: ", response);
        return response;
    } catch (error) {
        console.error("레시피 삭제 실패: ", error);
        throw Error;
    }
}

export default recipeDeleteRequest;