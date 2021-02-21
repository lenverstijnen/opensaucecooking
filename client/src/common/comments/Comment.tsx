import React from "react";
import { Box, makeStyles, Paper } from "@material-ui/core";
import { IComment } from "./IComment";
import { Avatar } from "../../common/Avatar";

interface Props {
  className?: string;
  comment: IComment;
}

const useStyles = makeStyles(({ palette, spacing }) => ({
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

export const Comment: React.FC<Props> = ({ comment, className }) => {
  const styles = useStyles();
  return (
    <Box display="flex" className={className}>
      <Avatar user={comment.user} className={styles.avatar} />
      <Box flexGrow={1}>
        <Paper elevation={0} className={styles.paper}>
          {comment.text}
        </Paper>
      </Box>
    </Box>
  );
};
