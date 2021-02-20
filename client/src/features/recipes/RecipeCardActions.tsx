import { Box, CardActions, makeStyles } from "@material-ui/core";
import { CommentButton } from "../../common/CommentButton";
import { CopyButton } from "../../common/CopyButton";
import { FavoriteButton } from "../../common/FavoriteButton";
import { LikeButton } from "../../common/LikeButton";
import { Recipe } from "./state";

export const RecipeCardActions = ({ recipe }: { recipe: Recipe }) => {
  return (
    <CardActions disableSpacing>
      <Box marginRight="auto">
        <LikeButton />
        <CommentButton />
        <CopyButton />
      </Box>
      <Box>
        <FavoriteButton />
      </Box>
    </CardActions>
  );
};
