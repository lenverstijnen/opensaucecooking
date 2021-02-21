import React from "react"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
}))

interface Props {}

const AlignRight: React.FC<Props> = (props) => {
  const classes = useStyles()

  return <div className={classes.root}>{props.children}</div>
}

export default AlignRight
