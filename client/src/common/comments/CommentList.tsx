import { IComment } from "./IComment";
import { Comment } from "./Comment";
import { makeStyles } from "@material-ui/core";
import { AddComment } from "./AddComment";
import React from "react";

const useStyles = makeStyles(() => ({
  comment: {
    marginBottom: 8,
    "&:last-child": {
      marginBottom: 0,
    },
  },
  addComment: {
    marginTop: 0,
    marginBottom: 8,
  },
}));

export const CommentList = ({ comments }: { comments: IComment[] }) => {
  const styles = useStyles();

  const commentItems = comments.map((comment) => (
    <Comment className={styles.comment} comment={comment} key={comment._id} />
  ));
  return (
    <>
      <AddComment key="add-comment" className={styles.addComment} />
      {commentItems}
    </>
  );
};
