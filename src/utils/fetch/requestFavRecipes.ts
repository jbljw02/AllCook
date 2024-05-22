import { FavoriteRecipe, setFavoriteRecipe } from "@/redux/features/favoriteRecipeSlice";
import { User } from "@/redux/features/userSlice";
import axios from "axios";

const requestFavRecipes = async(user : User) => {
    if (user && user.email) {
        const response = await axios.post('/api/userFavorite/recipe/reciveFavRecipes', {
            email: user.email,
        });

        const favRecipeFromStore: FavoriteRecipe[] = response.data.favoriteRecipe;
        return favRecipeFromStore;
    }
}

export default requestFavRecipes;