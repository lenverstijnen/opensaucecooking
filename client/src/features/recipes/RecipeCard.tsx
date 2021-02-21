import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  makeStyles,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { useRecipe } from "./state";
import { RecipeCardActions } from "./RecipeCardActions";
import { RecipeCardComments } from "./RecipeCardComments";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 16,
  },
  media: {
    paddingTop: "75%",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  avatar: {},
  actions: {
    paddingBottom: 0,
  },
  body: {
    paddingTop: 0,
  },
}));

export const RecipeCard = ({ recipeId }: { recipeId: string }) => {
  const classes = useStyles();
  const recipe = useRecipe(recipeId);
  if (!recipe) return <div>Not found</div>;

  const image = "https://scx2.b-cdn.net/gfx/news/hires/2016/howcuttingdo.jpg";

  const user = {
    fullName: "Jamie Oliver",
    photoUrl:
      "https://media1.popsugar-assets.com/files/thumbor/YgtUHW5gmKkzAYFTFLDbqcZiBF4/27x0:2920x2893/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2020/03/24/575/n/42718227/e915616e5e7a01d456f9d7.13584839_/i/jamie-oliver-keep-cooking-carry-on-tv-series.jpg",
  };

  const CardAvatar = (
    <Avatar aria-label="recipe" src={user.photoUrl} className={classes.avatar}>
      {user.fullName}
    </Avatar>
  );

  return (
    <Card className={classes.root}>
      <CardHeader avatar={CardAvatar} title={user.fullName}></CardHeader>
      <CardMedia image={image} className={classes.media}></CardMedia>
      <RecipeCardActions
        recipe={recipe}
        className={classes.actions}
      ></RecipeCardActions>
      <CardContent className={classes.body}>
        <Typography variant="h6">{recipe.name}</Typography>
        <Typography paragraph>This will be a description.</Typography>

        <RecipeCardComments></RecipeCardComments>
      </CardContent>
    </Card>
  );
};
