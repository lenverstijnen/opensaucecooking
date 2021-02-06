import { useEffect } from "react";
import { useRecipeContext } from "../context/recipe-context";
import httpService from "../services/http.service";

export const Home = () => {
  const [recipes, setRecipes] = useRecipeContext();
  useEffect(() => {
    const fetchData = async () => {
      const result = await httpService.get("recipe");
      setRecipes(result.data);
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
