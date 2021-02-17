import { useAuth0 } from "@auth0/auth0-react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../auth/Loading";
import { RecipeCard } from "./RecipeCard";
import { useObservable } from "@libreact/use-observable";
import {
  fetchRecipes,
  selectRecipeIds,
  selectRecipes as selectAllRecipes,
  selectRecipeStatus,
} from "./recipeSlice";
import { recipeService, useRecipes } from "./state";
import { useEntityService } from "../../hooks/useEntity";

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
    <Grid item xs={4} key={recipeId}>
      <RecipeCard recipeId={recipeId}></RecipeCard>
    </Grid>
  ));

  const cardGrid = (
    <Grid container spacing={2} className={styles.root}>
      {cards}
    </Grid>
  );

  return <Container>{loading ? <Loading /> : cardGrid}</Container>;
};
