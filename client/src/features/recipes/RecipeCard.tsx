import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { getFullName } from "../../utils/getFullName";
import { useUser } from "../users/state/user.store";
import { RecipeCardComments } from "./RecipeCardComments";
import { useRecipe } from "./state";

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

interface Props {
  recipeId: string;
}

export const RecipeCard: React.FC<Props> = ({ recipeId }) => {
  const classes = useStyles();
  const recipe = useRecipe(recipeId);
  const user = useUser(String(recipe?.userId));
  if (!recipe) return <div>Not found</div>;

  const fullName = user ? getFullName(user) : "";
  const recipeImage = recipe.media[0];

  const CardAvatar = (
    <Avatar
      aria-label="recipe"
      src={user?.photoUrl}
      className={classes.avatar}
      data-testid="recipe-card-avatar"
    >
      {fullName}
    </Avatar>
  );

  return (
    <Card className={classes.root}>
      <CardHeader avatar={CardAvatar} title={fullName}></CardHeader>
      <CardMedia
        image={recipeImage}
        className={classes.media}
        data-testid="recipe-image"
      >
        <div></div>
      </CardMedia>
      {/* 
      <RecipeCardActions
        recipeId={recipeId}
        className={classes.actions}
      ></RecipeCardActions> */}
      <CardContent className={classes.body}>
        <Typography variant="h6">{recipe.name}</Typography>
        <Typography paragraph>This will be a description.</Typography>

        <RecipeCardComments></RecipeCardComments>
      </CardContent>
    </Card>
  );
};
