import { Route, Switch } from "react-router-dom"
import { AppHeader } from "./app-header/AppHeader"
import "./App.css"
import { ProtectedRoute } from "./auth/ProtectedRoute"
import { CreateRecipe } from "./features/recipes/CreateRecipe/CreateRecipe"
import { Recipe } from "./features/recipes/Recipe"
import { Recipes } from "./features/recipes/Recipes"
import { useToken } from "./hooks/useToken"
import { Profile } from "./profile/Profile"

export default function App() {
  useToken()

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
  )
}
