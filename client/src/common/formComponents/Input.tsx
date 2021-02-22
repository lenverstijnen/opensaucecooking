import React from "react"
import { makeStyles, TextField, TextFieldProps } from "@material-ui/core"
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

const Input: React.FC<InputProps | TextFieldProps> = (props) => {
  const classes = useStyles()
  return (
    <>
      <label className={classes.label} htmlFor={props.name}>
        {props.label}
      </label>
      <TextField
        className={clsx(classes.root, props.className)}
        {...props}
        error={Boolean(props.error)}
        helperText={props.error}
        type={props.type || "text"}
        margin="dense"
        fullWidth
        variant="outlined"
        color="primary"
      />
    </>
  )
}

export default Input
