import React from "react"
import { makeStyles, TextField } from "@material-ui/core"
import clsx from "clsx"

const useStyles = makeStyles((theme) => ({
  root: {},

  label: {
    display: "none",
  },
}))
export interface InputProps {
  label: string
  value: string
  name: string
  error: string | undefined
  onChange: (e: any) => void
  rows?: number
  multiline?: boolean
  className?: string
  type?: string
}

const Input: React.FC<InputProps> = (props) => {
  const classes = useStyles()
  return (
    <>
      <label className={classes.label} htmlFor={props.name}>
        {props.label}
      </label>
      <TextField
        margin="dense"
        type={props.type || "text"}
        className={clsx(classes.root, props.className)}
        multiline={props.multiline}
        rows={props.rows}
        name={props.name}
        id={props.name}
        label={props.label}
        value={props.value}
        onChange={props.onChange}
        fullWidth
        variant="outlined"
        color="primary"
        //   margin="dense"
        error={Boolean(props.error)}
        helperText={props.error}
      />
    </>
  )
}

export default Input
