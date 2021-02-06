import { Route, Switch } from "react-router-dom";
import "./App.css";
import { Home } from "./home/Home";
import { Profile } from "./profile/Profile";
import { ProtectedRoute } from "./auth/ProtectedRoute";

export default function App() {
  return (
    <Switch>
      <ProtectedRoute path="/profile" component={Profile} />
      <Route path="/" component={Home} exact />
    </Switch>
  );
}
