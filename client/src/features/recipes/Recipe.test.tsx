import { getByText, render, screen } from "@testing-library/react";
import React from "react";
import { Recipe } from "./Recipe";
import { createRecipe } from "./state";
// import { createRecipe } from "./state";
import { recipeService } from "./state/recipe.service";

jest.mock("react-router-dom", () => ({
  useParams: jest.fn().mockReturnValue({ id: "a" }),
}));

it("should show not found text if not found", () => {
  const { queryByText } = render(<Recipe />);
  expect(queryByText("Recipe not found")).toBeTruthy();
});

it("should show the recipe", () => {
  const lasagne = createRecipe({
    _id: "a",
    name: "Lasagne",
  });

  recipeService.store.set([lasagne]);
  const { container } = render(<Recipe />);
  expect(container).toHaveTextContent("Lasagne");
});
