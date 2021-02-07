import { useAuth0 } from "@auth0/auth0-react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { IRecipe } from "../../../../server/src/models/Recipe";
import crudService from "../../services/crud.service";
import { useRecipeContext } from "./recipe-context";
import { RecipeCard } from "./RecipeCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { selectRecipes as selectAllRecipes } from "./recipeSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: 16,
  },
}));

export const Recipes = () => {
  const recipes = useSelector(selectAllRecipes);
  const styles = useStyles();

  const cards = recipes.map((r) => (
    <Grid item xs={4} key={Math.random()}>
      <RecipeCard recipe={r}></RecipeCard>
    </Grid>
  ));

  return (
    <Container>
      <Grid container spacing={2} className={styles.root}>
        {cards}
      </Grid>
    </Container>
  );
};
