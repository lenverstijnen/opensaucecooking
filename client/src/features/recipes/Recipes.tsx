import { useObservable } from "@libreact/use-observable";
import { Container, Grid, makeStyles } from "@material-ui/core";
import { Loading } from "../../auth/Loading";
import { RecipeCard } from "./RecipeCard";
import { recipeService, useRecipes } from "./state";

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: 16,
  },
  root: {
    flexGrow: 1,
    paddingTop: 16,
  },
  container: {
    maxWidth: 600,
  },
}));

export const Recipes = () => {
  const [loading] = useObservable(recipeService.query.selectLoading());
  const styles = useStyles();

  const { entities: recipes } = useRecipes();
  const recipeIds = recipes.map((x) => x._id);

  const cards = recipeIds.map((recipeId) => (
    <RecipeCard recipeId={recipeId}></RecipeCard>
  ));

  return (
    <Container className={styles.container}>
      {loading ? <Loading /> : cards}
    </Container>
  );
};
