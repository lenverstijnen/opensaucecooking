import React from "react";
import { IconButton, makeStyles, Typography } from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  count: {
    marginLeft: 4,
  },
}));

interface Props {
  isLiked?: boolean;
  onLike?: (isLiked: boolean) => void;
  likes?: string[];
}

export const LikeButton: React.FC<Props> = ({ isLiked, onLike, likes }) => {
  const styles = useStyles();
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
      {likes?.length ? (
        <Typography className={styles.count}>{likes?.length}</Typography>
      ) : (
        ""
      )}
    </IconButton>
  );
};
