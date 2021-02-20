import { IconButton } from "@material-ui/core";
import { Bookmark, BookmarkBorder } from "@material-ui/icons";
import { useState } from "react";

export const FavoriteButton = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const ActiveButton = <Bookmark color="primary" />;
  const InActiveButton = <BookmarkBorder />;

  const toggle = () => setIsFavorite(!isFavorite);

  return (
    <IconButton onClick={toggle}>
      {isFavorite ? ActiveButton : InActiveButton}
    </IconButton>
  );
};
