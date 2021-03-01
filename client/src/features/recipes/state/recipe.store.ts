import { guid } from "@datorama/akita";
import { IRecipe } from "../../../../../server/src/models/Recipe";
import { useEntities } from "../../../hooks/useEntities";
import { useEntity } from "../../../hooks/useEntity";
import { setupEntityHooks } from "../../../services/setupEntity";
import { recipeService } from "./recipe.service";

export interface Recipe extends IRecipe {
  _id: string;
}

export function createRecipe(params: Partial<Recipe>): Recipe {
  return {
    _id: guid(),
    name: "",
    steps: ["Zoiezo meer zout toevoegen"],
    ingredients: [],
    userId: "1" as any,
    media: [],
    rating: [],
    likes: [],
    ...params,
  };
}

export function useRecipe(id: string) {
  return useEntity(recipeService, id);
}

export const { useEntities: useRecipes } = setupEntityHooks<Recipe>(
  recipeService
);
