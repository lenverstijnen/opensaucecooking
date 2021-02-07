import { Route, Switch } from "react-router-dom";
import "./App.css";
import { Home } from "./home/Home";
import { Profile } from "./profile/Profile";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { AppHeader } from "./app-header/AppHeader";
import { CreateRecipe } from "./features/recipes/CreateRecipe";
import { Recipe } from "./features/recipes/Recipe";
import { Recipes } from "./features/recipes/Recipes";

export default function App() {
  return (
    <div>
      <AppHeader />
      <Switch>
        <ProtectedRoute path="/profile" component={Profile} exact />
        <Route path="/recipes" component={Recipes} exact />
        <Route path="/recipes/create" component={CreateRecipe} exact />
        <Route path="/recipes/:id" component={Recipe} exact />
        <Route path="/recipes/:id/edit" component={CreateRecipe} exact />
      </Switch>
    </div>
  );
}
