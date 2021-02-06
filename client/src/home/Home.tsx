import { useEffect } from "react";
import { useRecipeContext } from "../context/recipe-context";
import httpService from "../services/http.service";

export const Home = () => {
  const { recipes, setRecipes } = useRecipeContext();
  useEffect(() => {
    httpService.get("http://localhost:3001/api/recipes").then((recipes) => {
      setRecipes(recipes as any);
    });
  });

  return (
    <div>
      <h1>Home</h1>
      {recipes.map((recipe) => (
        <div key={recipe.name}>{recipe.name}</div>
      ))}
    </div>
  );
};
