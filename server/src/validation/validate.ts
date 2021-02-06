import Joi from "joi"

type objectOrNull = { [k: string]: string } | null

export const validate = (input: {}, schema: {}): objectOrNull => {
  let errors: objectOrNull = {}
  const { error } = Joi.object(schema).validate(input, {
    abortEarly: false,
  })

  error
    ? error.details.forEach((e) => {
        errors![e.path[0]] = e.message
      })
    : (errors = null)

  return errors
}
