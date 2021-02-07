import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { selectRecipeById } from "./recipeSlice";

export const Recipe = () => {
  const { id } = useParams<{ id?: string }>();

  const recipe = useSelector((state: RootState) => selectRecipeById(state, id));

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <h1>
      Recipe id: {id} with name: {recipe.name} and ingredients:{" "}
      {recipe.ingredients.join(", ")}
    </h1>
  );
};
