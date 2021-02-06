import { createContext, PropsWithChildren, useContext, useState } from "react";

export enum UnitEnum {
  gram = "gram",
  liter = "liter",
  stuks = "stuks",
}
export interface IIngredient {
  name: string;
  quantity: number;
  unit: UnitEnum;
}

export interface IRating {
  userId: string;
  value: number;
  createdAt: Date;
}
export interface IRecipe {
  name: string;
  steps: string[];
  ingredients: IIngredient[];
  userId: string;
  media: string[];
  rating: IRating[];
}

type Value = {
  recipes: IRecipe[];
  setRecipes: React.Dispatch<React.SetStateAction<IRecipe[]>>;
};

const RecipeContext = createContext<Value | undefined>(undefined);

export const RecipeContextProvider = (props: PropsWithChildren<unknown>) => {
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

  const [recipes, setRecipes] = useState<IRecipe[]>([mockRecipe]);

  return (
    <RecipeContext.Provider value={{ recipes, setRecipes } as Value}>
      {props.children}
    </RecipeContext.Provider>
  );
};

export const useRecipeContext = () => useContext(RecipeContext) as Value;

export default RecipeContext;
