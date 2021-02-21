import { useAuth0 } from "@auth0/auth0-react";
import { Recipe } from "../state";
import { recipeService } from "../state/recipe.service";

export const useRecipeLike = (recipe: Recipe) => {
  const { user } = useAuth0();
  const isLiked = recipe.likes?.indexOf(user.sub) > -1;
  const setIsLiked = (isLiked: boolean) =>
    isLiked
      ? recipeService.like(recipe._id, user.sub)
      : recipeService.unlike(recipe._id, user.sub);
  return [isLiked, setIsLiked] as [
    boolean,
    (isLiked: boolean) => Promise<void>
  ];
};
