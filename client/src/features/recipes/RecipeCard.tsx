import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { Create } from "@material-ui/icons";
import { Link, useRouteMatch } from "react-router-dom";
import type { IRecipe } from "../../../../server/src/models/Recipe";
import { WithId } from "./recipeSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  media: {
    height: 140,
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

export const RecipeCard = ({ recipe }: { recipe: WithId<IRecipe> }) => {
  const classes = useStyles();
  const { url, path } = useRouteMatch();

  const subheader = recipe.ingredients.map((i) => i.name).slice(0, 25);
  const image = "https://scx2.b-cdn.net/gfx/news/hires/2016/howcuttingdo.jpg";

  return (
    <Card className={classes.root}>
      <CardMedia image={image} className={classes.media}></CardMedia>
      <CardHeader title={recipe.name} subheader={subheader}></CardHeader>
      <CardActions disableSpacing>
        <Button to={`/recipes/${recipe.id}`} component={Link}>
          Bekijk
        </Button>
        <IconButton component={Link} to={`/recipes/${recipe.id}/edit`}>
          <Create />
        </IconButton>
      </CardActions>
    </Card>
  );
};
