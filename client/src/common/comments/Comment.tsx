import React from "react";
import { Box, makeStyles, Paper } from "@material-ui/core";
import { IComment } from "./IComment";
import { Avatar } from "../../common/Avatar";

const useStyles = makeStyles(({ palette, spacing }) => ({
  root: {
    marginBottom: 8,
  },
  avatar: {
    marginRight: 8,
  },
  paper: {
    backgroundColor: palette.background.default,
    padding: spacing(1),
    paddingLeft: spacing(1.5),
    paddingRight: spacing(1.5),
  },
}));

export const Comment = ({ comment }: { comment: IComment }) => {
  const styles = useStyles();
  return (
    <Box display="flex" className={styles.root}>
      <Avatar user={comment.user} />
      <Box flexGrow={1}>
        <Paper elevation={0} className={styles.paper}>
          {comment.text}
        </Paper>
      </Box>
    </Box>
  );
};
