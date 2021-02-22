import React from "react"
import { FieldAttributes, useField } from "formik"
import { TextField } from "@material-ui/core"

type InputProps = { label: string } & FieldAttributes<{}>

const Input: React.FC<InputProps> = (props) => {
  const [field, meta] = useField<{}>(props)

  const errorText = meta.error && meta.touched ? meta.error : ""

  return (
    <>
      <TextField
        error={!!errorText}
        helperText={errorText}
        label={props.label}
        {...field}
        name={field.name}
        fullWidth
        margin="dense"
      />
    </>
  )
}
export default Input
