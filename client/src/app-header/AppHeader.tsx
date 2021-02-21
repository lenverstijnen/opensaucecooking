import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core"
import { AuthButton } from "./AuthButton"
import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    textTransform: "capitalize",
    color: "white",
    margin: "0 10px",
  },
}))

export const AppHeader = () => {
  const classes = useStyles()

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Open Sauce Cooking
        </Typography>
        <Link className={classes.link} to="/recipes">
          Recipes
        </Link>
        <Link className={classes.link} to="/recipes/create">
          Create recipe
        </Link>
        <AuthButton />
      </Toolbar>
    </AppBar>
  )
}
