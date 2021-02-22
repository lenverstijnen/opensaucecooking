import React from "react"
import { makeStyles } from "@material-ui/core"
import { colors } from "../themesAndStyles/colors"

const useStyles = makeStyles((theme) => ({
  root: {
    border: `solid 1px lightgrey`,
    padding: 20,
    borderRadius: 10,
    margin: "10px 0",
  },
}))

interface Props {}

const SectionWrapper: React.FC<Props> = (props) => {
  const classes = useStyles()

  return <div className={classes.root}>{props.children}</div>
}

export default SectionWrapper
