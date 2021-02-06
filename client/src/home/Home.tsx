import { useEffect } from "react";
import { IRecipe } from "../../../server/src/models/Recipe";
import { useRecipeContext } from "../context/recipe-context";
import crudService from "../services/crud.service";

export const Home = () => {
  const [recipes, setRecipes] = useRecipeContext();
  useEffect(() => {
    const fetchData = async () => {
      const result = await crudService.all<IRecipe>("recipe");
      setRecipes(result);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {recipes.map((recipe) => (
        <div key={recipe.name}>{recipe.name}</div>
      ))}
    </div>
  );
};
