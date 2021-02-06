import Joi from "joi"
import { regex } from "./regex"
regex

export const validators = {
  objectId: Joi.string().regex(regex.objectId),
  shortString: Joi.string().max(255),
}
