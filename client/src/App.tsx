import { Route, Switch } from "react-router-dom";
import { AppHeader } from "./app-header/AppHeader";
import "./App.css";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { CreateRecipe } from "./features/recipes/CreateRecipe/CreateRecipe";
import { Recipe } from "./features/recipes/Recipe";
import { Recipes } from "./features/recipes/Recipes";
import { useToken } from "./hooks/useToken";
import { Profile } from "./profile/Profile";

export default function App() {
  useToken();

  return (
    <div>
      <AppHeader />
      <Switch>
        <ProtectedRoute path="/profile" component={Profile} exact />
        <ProtectedRoute path="/recipes" component={Recipes} exact />
        <ProtectedRoute path="/recipes/create" component={CreateRecipe} exact />
        <ProtectedRoute path="/recipes/:id" component={Recipe} exact />
        <ProtectedRoute
          path="/recipes/:id/edit"
          component={CreateRecipe}
          exact
        />
      </Switch>
    </div>
  );
}
