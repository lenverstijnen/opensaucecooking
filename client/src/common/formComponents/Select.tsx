import React, { useEffect, useState, useRef } from "react"
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@material-ui/core"
import randomString from "crypto-random-string"

export interface SelectProps {
  name: string
  label: string
  value: string
  error: string | undefined
  onChange: (e: any) => void
  items: { value: string; label: string }[]
  className?: string
  noEmpty?: boolean
}

const Select: React.FC<SelectProps> = (props) => {
  const id = randomString({ length: 10 })

  const inputLabel = useRef<HTMLLabelElement>(null)
  const [labelWidth, setLabelWidth] = useState(0)
  useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth)
  }, [])

  return (
    <FormControl
      error={Boolean(props.error)}
      className={props.className}
      variant="outlined"
      margin="dense"
      fullWidth
    >
      <InputLabel ref={inputLabel} id={id}>
        {props.label}
      </InputLabel>
      <MuiSelect
        name={props.name}
        labelWidth={labelWidth}
        labelId={id}
        value={props.value}
        onChange={props.onChange}
      >
        {!props.noEmpty && <MenuItem value="">-</MenuItem>}
        {props.items.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {props.error && <FormHelperText>{props.error}</FormHelperText>}
    </FormControl>
  )
}

export default Select
