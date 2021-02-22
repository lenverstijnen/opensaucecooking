import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select as MuiSelect,
} from "@material-ui/core"
import randomString from "crypto-random-string"
import { FieldAttributes, useField } from "formik"
import React, { useEffect, useRef, useState } from "react"

type InputProps = { label: string } & FieldAttributes<{}>

const Select: React.FC<InputProps> = (props) => {
  const [field, meta] = useField<{}>(props)
  const errorText = meta.error && meta.touched ? meta.error : ""

  const id = randomString({ length: 10 })

  const inputLabel = useRef<HTMLLabelElement>(null)
  const [labelWidth, setLabelWidth] = useState(0)
  useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth)
  }, [])

  return (
    <FormControl
      error={!!errorText}
      className={props.className}
      margin="dense"
      fullWidth
    >
      <InputLabel ref={inputLabel} id={id}>
        {props.label}
      </InputLabel>
      <MuiSelect {...field} id={id} labelWidth={labelWidth}>
        {props.children}
      </MuiSelect>
      {!!errorText && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  )
}

export default Select
