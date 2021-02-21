import { Container, makeStyles } from "@material-ui/core";
import { Loading } from "../../auth/Loading";
import { RecipeCard } from "./RecipeCard";
import { useRecipes } from "./state";

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
  const styles = useStyles();

  const { entities: recipes, loading, entityIds: recipeIds } = useRecipes();

  const cards = recipeIds.map((recipeId) => (
    <RecipeCard recipeId={recipeId}></RecipeCard>
  ));

  return (
    <Container disableGutters maxWidth="sm">
      {loading ? <Loading /> : cards}
    </Container>
  );
};
