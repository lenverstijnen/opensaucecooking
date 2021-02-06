import { Route, Switch } from "react-router-dom";
import { Recipes } from "./Recipes";
import { Recipe } from "./Recipe";
import { RecipeContextProvider } from "./recipe-context";

export const RecipeRoutes = () => (
  <RecipeContextProvider>
    <Switch>
      <Route path="/" component={Recipes} />
      <Route path="/:id" component={Recipe} />
    </Switch>
  </RecipeContextProvider>
);
