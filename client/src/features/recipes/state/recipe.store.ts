import { guid } from "@datorama/akita";
import { IRecipe } from "../../../../../server/src/models/Recipe";
import { createUseEntityService, useEntity } from "../../../hooks/useEntity";
import { createEntityService } from "../../../services/entity.service";

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

export const recipeService = createEntityService<Recipe>("recipe");
export const useRecipes = createUseEntityService(recipeService);
export function useRecipe(id: string) {
  return useEntity(recipeService, id);
}

// export function useRecipes() {
//   const service = useEntityService(recipeService);
//   return service;
// }
