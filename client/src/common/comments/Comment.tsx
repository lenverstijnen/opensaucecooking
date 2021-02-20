import { Box, makeStyles, Paper, Avatar } from "@material-ui/core";
import { IComment } from "./IComment";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 8,
  },
  avatar: {
    marginRight: 8,
  },
}));

export const Comment = ({ comment }: { comment: IComment }) => {
  const styles = useStyles();
  return (
    <Box display="flex" className={styles.root}>
      <Avatar className={styles.avatar}>JO</Avatar>
      <Box flexGrow={1}>
        <Paper elevation={0}>{comment.text}</Paper>
      </Box>
    </Box>
  );
};
