import { Box, CardActions, makeStyles } from "@material-ui/core";
import { CommentButton } from "../../common/CommentButton";
import { CopyButton } from "../../common/CopyButton";
import { FavoriteButton } from "../../common/FavoriteButton";
import { LikeButton } from "../../common/LikeButton";
import { useRecipeLike } from "./hooks/useRecipeLike";

interface Props {
  recipeId: string;
  className?: string;
}
export const RecipeCardActions: React.FC<Props> = ({ recipeId, className }) => {
  const [isLiked, setIsLiked, likes] = useRecipeLike(recipeId);

  return (
    <CardActions disableSpacing className={className}>
      <Box marginRight="auto">
        <LikeButton isLiked={isLiked} onLike={setIsLiked} likes={likes} />
        <CommentButton />
        <CopyButton />
      </Box>
      <Box>
        <FavoriteButton />
      </Box>
    </CardActions>
  );
};
