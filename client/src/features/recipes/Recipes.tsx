import { useObservable } from "@libreact/use-observable";
import { Container, Grid, makeStyles } from "@material-ui/core";
import { Loading } from "../../auth/Loading";
import { RecipeCard } from "./RecipeCard";
import { recipeService, useRecipes } from "./state";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: 16,
  },
}));

export const Recipes = () => {
  // const [recipes] = useObservable(recipeService.all(), []);
  const [loading] = useObservable(recipeService.query.selectLoading());
  const styles = useStyles();

  const { entities: recipes } = useRecipes();
  const recipeIds = recipes.map((x) => x._id);

  const cards = recipeIds.map((recipeId) => (
    <RecipeCard recipeId={recipeId}></RecipeCard>
  ));

  return <Container>{loading ? <Loading /> : cards}</Container>;
};
