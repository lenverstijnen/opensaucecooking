import { useAuth0 } from "@auth0/auth0-react";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IRecipe } from "../../../../server/src/models/Recipe";
import httpService from "../../services/http.service";
import { RootState } from "../../store";

export type WithId<T> = T & { id: string };

// const mockRecipe: WithId<IRecipe> = {
//   id: "abc",
//   name: "Spaghetti Bolo",
//   steps: [
//     "Vlees in de Pan",
//     "Wortel Ui Bakken",
//     "Kei hard zwart laten worden",
//     "Pan op de grond flikkeren",
//     "Boos Weglopen",
//   ],
//   ingredients: [{ name: "Uien", quantity: 10, unit: "stuks" as any }],
//   userId: "5f97e5973283b500174731c2" as any,
//   media: ["foo", "baz"],
//   rating: [],
// };

export function createRecipeModel(props: Partial<IRecipe>): WithId<IRecipe> {
  return {
    id: new Date().getTime().toString(),
    name: "",
    steps: [],
    ingredients: [],
    userId: "1" as any,
    media: [],
    rating: [],
    ...props,
  };
}

export interface RecipeState {
  data: WithId<IRecipe>[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: RecipeState = {
  data: [],
  status: "loading",
  error: null,
};

export const fetchRecipes = createAsyncThunk(
  "recipe/fetchRecipes",
  async (token: string) => {
    const response = await httpService.get<WithId<IRecipe>[]>("recipe", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    recipeAdded: {
      reducer(state, { payload }: PayloadAction<WithId<IRecipe>>) {
        state.data.push(payload);
      },
      prepare(data: Partial<IRecipe>) {
        return {
          payload: createRecipeModel(data),
        };
      },
    },
    recipeUpdated(state, action: PayloadAction<WithId<Partial<IRecipe>>>) {
      const item = state.data.find((r) => r.id === action.payload.id);
      if (!item) throw Error("Post not found.");

      Object.assign(item, action.payload);
    },
  },
});

export const { recipeAdded, recipeUpdated } = recipeSlice.actions;

export default recipeSlice.reducer;

export const selectRecipes = (state: RootState) => state.recipe.data;
export const selectRecipeById = (state: RootState, id: string | undefined) =>
  state.recipe.data.find((r) => (r as WithId<IRecipe>).id === id);
