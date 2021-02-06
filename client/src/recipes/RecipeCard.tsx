import {
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Link,
  makeStyles,
} from "@material-ui/core";
import type { IRecipe } from "../../../server/src/models/Recipe";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  media: {
    height: 140,
  },
}));

export const RecipeCard = ({ recipe }: { recipe: IRecipe }) => {
  const classes = useStyles();

  const subheader = recipe.ingredients.map((i) => i.name).slice(0, 25);
  const image = "https://scx2.b-cdn.net/gfx/news/hires/2016/howcuttingdo.jpg";

  return (
    <Card className={classes.root}>
      <CardMedia image={image} className={classes.media}></CardMedia>
      <CardHeader title={recipe.name} subheader={subheader}></CardHeader>
    </Card>
  );
};
