import { guid } from "@datorama/akita";
import { IRecipe } from "../../../../../server/src/models/Recipe";
import {
  createUseEntities,
  createUseEntity,
  useEntity,
} from "../../../hooks/useEntity";
import { createEntityService } from "../../../services/entity.service";
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
  useEntities: useRecipies,
  useEntity: useRecipe,
} = setupEntity("recipe");
