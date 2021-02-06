import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { AuthButton } from "./AuthButton";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

export const AppHeader = () => {
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Open Sauce Cooking
        </Typography>
        <AuthButton />
      </Toolbar>
    </AppBar>
  );
};
