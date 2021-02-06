import type { IRecipe } from "../../../server/src/models/Recipe";
import {
  createProvider,
  createTypedContext,
  useTypedContext,
} from "./context-type";

export enum UnitEnum {
  gram = "gram",
  liter = "liter",
  stuks = "stuks",
}

const mockRecipe: IRecipe = {
  name: "Spaghetti Bolo",
  steps: [
    "Vlees in de Pan",
    "Wortel Ui Bakken",
    "Kei hard zwart laten worden",
    "Pan op de grond flikkeren",
    "Boos Weglopen",
  ],
  ingredients: [{ name: "Uien", quantity: 10, unit: UnitEnum.stuks }],
  userId: "5f97e5973283b500174731c2" as any,
  media: ["foo", "baz"],
  rating: [],
};

export const RecipeContext = createTypedContext<IRecipe[]>();
export const RecipeContextProvider = createProvider(RecipeContext, [
  mockRecipe,
]);
export const useRecipeContext = () => useTypedContext(RecipeContext);
