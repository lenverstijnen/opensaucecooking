import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Recipe, useRecipe } from "../state";
import { recipeService } from "../state/recipe.service";

export const useRecipeLike = (recipeId: string) => {
  const { user } = useAuth0();
  const recipe = useRecipe(recipeId);
  if (!recipe) throw new Error("No recipe found.");

  const isLiked = recipe.likes?.indexOf(user.sub) > -1;

  const setIsLiked = (isLiked: boolean) => {
    isLiked
      ? recipeService.like(recipe._id, user.sub)
      : recipeService.unlike(recipe._id, user.sub);
  };

  return [isLiked, setIsLiked, recipe.likes] as [
    boolean,
    (isLiked: boolean) => Promise<void>,
    string[]
  ];
};
