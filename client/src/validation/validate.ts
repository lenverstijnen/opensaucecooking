import { object } from "yup"

type obj = { [k: string]: string }

export const validate = async (input: {}, schema: {}) => {
  let errors: obj = {}
  try {
    await object(schema).validate(input, {
      abortEarly: false,
    })
  } catch (error) {
    console.log(error.inner)
    error.inner.forEach((e: any) => (errors[e.path] = e.message))
  }
  return Object.keys(errors).length ? errors : null
}
