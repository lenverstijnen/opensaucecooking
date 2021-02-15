import { useAuth0 } from "@auth0/auth0-react";
import { EntityState, guid, ID } from "@datorama/akita";
import { useEffect } from "react";
import { IRecipe } from "../../../../../server/src/models/Recipe";
import { createEntityService } from "../../../services/entity.service";

export interface Recipe extends IRecipe {
  _id: ID;
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

export interface RecipeState extends EntityState<Recipe> {}

export const recipeService = createEntityService<RecipeState>("recipe");
