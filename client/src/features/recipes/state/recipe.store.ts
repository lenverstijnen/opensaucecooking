import { guid } from "@datorama/akita";
import { IRecipe } from "../../../../../server/src/models/Recipe";
import { setupEntity } from "../../../services/setupEntity";

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
    ...params,
  };
}

export const {
  entityService: recipeService,
  useEntities: useRecipes,
  useEntity: useRecipe,
} = setupEntity<Recipe>("recipe");