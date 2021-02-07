import { configureStore } from "@reduxjs/toolkit";
import recipeReducer, { RecipeState } from "./features/recipes/recipeSlice";

const store = configureStore({
  reducer: {
    recipe: recipeReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
