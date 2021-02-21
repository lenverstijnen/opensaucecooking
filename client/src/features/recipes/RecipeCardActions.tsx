import { Box, CardActions, makeStyles } from "@material-ui/core";
import { CommentButton } from "../../common/CommentButton";
import { CopyButton } from "../../common/CopyButton";
import { FavoriteButton } from "../../common/FavoriteButton";
import { LikeButton } from "../../common/LikeButton";
import { useRecipeLike } from "./hooks/useRecipeLike";
import { Recipe } from "./state";

interface Props {
  recipe: Recipe;
  className?: string;
}
export const RecipeCardActions: React.FC<Props> = ({ recipe, className }) => {
  const [isLiked, setIsLiked] = useRecipeLike(recipe);

  return (
    <CardActions disableSpacing className={className}>
      <Box marginRight="auto">
        <LikeButton isLiked={isLiked} onLike={setIsLiked} />
        <CommentButton />
        <CopyButton />
      </Box>
      <Box>
        <FavoriteButton />
      </Box>
    </CardActions>
  );
};
