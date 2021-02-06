import { Route, Switch } from "react-router-dom";
import "./App.css";
import { Home } from "./home/Home";
import { Profile } from "./profile/Profile";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { AppHeader } from "./app-header/AppHeader";
import { RecipeRoutes } from "./recipes/RecipeRoutes";

export default function App() {
  return (
    <div>
      <AppHeader />
      <Switch>
        <ProtectedRoute path="/profile" component={Profile} />
        <Route path="/" component={RecipeRoutes} />
      </Switch>
    </div>
  );
}
