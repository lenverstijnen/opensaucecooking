import { Container, Grid, makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { IRecipe } from "../../../server/src/models/Recipe";
import crudService from "../services/crud.service";
import { useRecipeContext } from "./recipe-context";
import { RecipeCard } from "./RecipeCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: 16,
  },
}));

export const Recipes = () => {
  const [items, setItems] = useRecipeContext();
  const styles = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const result = await crudService.all<IRecipe>("recipe");
      setItems(result);
      console.log(result);
    };

    fetchData();
  }, []);

  const cards = items.map((r) => (
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
