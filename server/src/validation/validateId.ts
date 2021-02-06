import { validators } from "./validators"
import { RequestHandler } from "express"
import { validate } from "./validate"

const schema = {
  id: validators.objectId.required(),
}

export const validateId: RequestHandler = (req, res, next) => {
  const errors = validate({ id: req.params.id }, schema)
  if (errors) return res.status(400).send("ID is incorrect")
  else next()
}
