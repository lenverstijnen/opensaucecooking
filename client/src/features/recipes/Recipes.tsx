import { useAuth0 } from "@auth0/auth0-react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../auth/Loading";
import { RecipeCard } from "./RecipeCard";
import {
  fetchRecipes,
  selectRecipes as selectAllRecipes,
  selectRecipeStatus,
} from "./recipeSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: 16,
  },
}));

export const Recipes = () => {
  const recipes = useSelector(selectAllRecipes);
  const recipeStatus = useSelector(selectRecipeStatus);
  const styles = useStyles();
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (recipeStatus === "idle") {
        const token = await getAccessTokenSilently();
        dispatch(fetchRecipes(token));
      }
    })();
  }, []);

  const cards = recipes.map((r) => (
    <Grid item xs={4} key={Math.random()}>
      <RecipeCard recipe={r}></RecipeCard>
    </Grid>
  ));

  const cardGrid = (
    <Grid container spacing={2} className={styles.root}>
      {cards}
    </Grid>
  );

  return (
    <Container>{recipeStatus === "loading" ? <Loading /> : cardGrid}</Container>
  );
};
