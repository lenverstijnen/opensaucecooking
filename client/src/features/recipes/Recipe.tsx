import { useParams } from "react-router-dom";
import { recipeService } from "./state/recipe.service";
import { useObservable } from "../../hooks/useObservable";
import { EntityService } from "../../services/entity.service";
import React from "react";
import { useRecipe } from "./state";

export function Recipe() {
  const { id } = useParams<{ id: string }>();
  const recipe = useRecipe(id);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }
  return (
    <h1>
      Recipe id: {id} with name: {recipe.name} and ingredients:{" "}
      {recipe.ingredients.join(", ")}
    </h1>
  );
}
