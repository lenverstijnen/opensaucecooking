import type { IRecipe } from "../../../server/src/models/Recipe";
import {
  createProvider,
  createTypedContext,
  useTypedContext,
} from "./context-type";

export const RecipeContext = createTypedContext<IRecipe[]>();
export const RecipeContextProvider = createProvider(RecipeContext, []);
export const useRecipeContext = () => useTypedContext(RecipeContext);
