import { useAuth0 } from "@auth0/auth0-react";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IRecipe } from "../../../../server/src/models/Recipe";
import httpService from "../../services/http.service";
import { RootState } from "../../store";

export type WithId<T> = T & { _id: string };

const recipeAdapter = createEntityAdapter<WithId<IRecipe>>({
  selectId: (model) => model._id,
});

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
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState = recipeAdapter.getInitialState<RecipeState>({
  status: "idle",
  error: null,
});

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
    recipeUpdated(state, { payload }: PayloadAction<WithId<Partial<IRecipe>>>) {
      const item = state.entities[payload._id];
      if (!item) throw Error("Post not found.");

      Object.assign(item, payload);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecipes.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        recipeAdapter.upsertMany(state, payload);
      })
      .addCase(fetchRecipes.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addRecipe.fulfilled, recipeAdapter.addOne),
});

export const { recipeUpdated } = recipeSlice.actions;

export default recipeSlice.reducer;

export const {
  selectAll: selectRecipes,
  selectById: selectRecipeById,
  selectIds: selectRecipeIds,
} = recipeAdapter.getSelectors((state: RootState) => state.recipe);

export const selectRecipeSlice = (state: RootState) => state.recipe;

export const selectRecipeStatus = createSelector(
  selectRecipeSlice,
  (state) => state.status
);
