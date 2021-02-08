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

export type WithId<T> = T & { _id: string };

export function createRecipeModel(props: Partial<IRecipe>): IRecipe {
  return {
    name: "",
    steps: ["Zoiezo meer zout toevoegen"],
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
  status: "idle",
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

export const addRecipe = createAsyncThunk(
  "recipe/addRecipe",
  async ([token, recipe]: [string, IRecipe]) => {
    const response = await httpService.post<WithId<IRecipe>>("recipe", recipe, {
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
    recipeAdded(state, { payload }: PayloadAction<WithId<IRecipe>>) {
      state.data.push(payload);
    },

    recipeUpdated(state, action: PayloadAction<WithId<Partial<IRecipe>>>) {
      const item = state.data.find((r) => r._id === action.payload._id);
      if (!item) throw Error("Post not found.");

      Object.assign(item, action.payload);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecipes.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.data = payload;
      })
      .addCase(fetchRecipes.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addRecipe.fulfilled, (state, { payload }) => {
        state.data.push(payload);
      }),
});

export const { recipeAdded, recipeUpdated } = recipeSlice.actions;

export default recipeSlice.reducer;

export const selectRecipes = (state: RootState) => state.recipe.data;
export const selectRecipeById = (state: RootState, id: string | undefined) =>
  state.recipe.data.find((r) => (r as WithId<IRecipe>)._id === id);
export const selectRecipeStatus = (state: RootState) => state.recipe.status;
