import { useParams } from "react-router-dom";
import { useRecipe } from "./state";

export const Recipe = () => {
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
};
