import * as yup from "yup"
import { validators } from "./validators"
import { validate } from "./validate"
import { errorMessages } from "./errorMessages"

const schema = {
  name: validators.shortString.required(errorMessages.required),
  ingredients: yup.array().of(
    yup.object({
      name: validators.shortString.required(errorMessages.required),
      quantity: yup.number().required(),
      unit: yup.string().matches(/gram|liter|pieces/),
    })
  ),
  steps: yup.array().of(validators.mediumString.required()),
}

export const validateRecipe = (input: object) => validate(input, schema)
