import { guid } from "@datorama/akita";
import { IRecipe } from "../../../../../server/src/models/Recipe";
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

export const {
  useEntities: useRecipes,
  useEntity: useRecipe,
} = setupEntityHooks<Recipe>(recipeService);
