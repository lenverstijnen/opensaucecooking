import { render, screen } from "@testing-library/react";
import { RecipeCard } from "./RecipeCard";
import * as RecipeStore from "./state/recipe.store";
import * as UserStore from "../users/state/user.store";
import React from "react";
import { IUser } from "../../common/interfaces/IUser";

it("should show the avatar and name of the user", () => {
  const { container } = renderRecipeCard();
  verifyAvatar("jamie-oliver.png");
  expect(container).toHaveTextContent("Jamie Oliver");
});

it("should show an image of the recipe", () => {
  renderRecipeCard();
  verifyRecipeImage();
});

it("should show the name and description of the recipe", () => {
  renderRecipeCard();
  expect(screen.queryByText("lasagne")).toBeTruthy();
  expect(screen.queryByText("This will be a description.")).toBeTruthy();
});

it("should render the comments", () => {
  renderRecipeCard();
  expect(screen.queryByText("This is a comment.")).toBeTruthy();
});

function verifyRecipeImage() {
  const image = screen.queryByTestId("recipe-image");
  expect(image).toHaveStyle({ backgroundImage: "url(lasagne.png)" });
}

function renderRecipeCard() {
  const recipe = createRecipe();
  const user = createUser();

  jest.spyOn(RecipeStore, "useRecipe").mockReturnValue(recipe);
  jest.spyOn(UserStore, "useUser").mockReturnValue(user);
  return render(<RecipeCard recipeId="a" />);
}

function verifyAvatar(photoUrl: string) {
  const avatar = screen.queryByTestId("recipe-card-avatar");
  expect(avatar?.querySelector("img")).toHaveAttribute("src", photoUrl);
}

function createRecipe() {
  return RecipeStore.createRecipe({
    _id: "a",
    name: "lasagne",
    media: ["lasagne.png"],
  });
}

function createUser(): IUser {
  return {
    _id: "a",
    firstName: "Jamie",
    lastName: "Oliver",
    photoUrl: "jamie-oliver.png",
  };
}
