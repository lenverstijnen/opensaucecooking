import React from "react";
import { IconButton } from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";

interface Props {
  isLiked?: boolean;
  onLike?: (isLiked: boolean) => void;
}

export const LikeButton: React.FC<Props> = ({ isLiked, onLike }) => {
  const LikedButton = <Favorite color="error" />;
  const NotLikedBUtton = <FavoriteBorder />;

  const clickHandler = () => {
    if (onLike) {
      onLike(!isLiked);
    }
  };

  return (
    <IconButton onClick={clickHandler}>
      {isLiked ? LikedButton : NotLikedBUtton}
    </IconButton>
  );
};
