import { IconButton } from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import { useState } from "react";

export const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  const LikedButton = <Favorite color="error" />;
  const NotLikedBUtton = <FavoriteBorder />;

  return (
    <IconButton onClick={() => setLiked(!liked)}>
      {liked ? LikedButton : NotLikedBUtton}
    </IconButton>
  );
};
