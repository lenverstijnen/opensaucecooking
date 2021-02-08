import { RequestHandler } from "express";
import { validate } from "./validate";
import Joi from "joi";
import { validators } from "./validators";

const ingredientSchema = {
  _id: validators.objectId,
  name: Joi.string().max(255).required(),
  quantity: Joi.number().required(),
  unit: Joi.string().valid("gram", "liter"), // TODO: types definieren.
};

const ratingSchema = {
  userId: Joi.string(),
  value: Joi.number().min(1).max(10),
};

const schema = {
  _id: validators.objectId,
  name: validators.shortString.required(),
  steps: Joi.array().items(Joi.string().required()),
  ingredients: Joi.array().items(ingredientSchema),
  userId: Joi.string(),
  media: Joi.array().items(Joi.string()),
  rating: Joi.array().items(ratingSchema),
};

export const validateRecipe: RequestHandler = async (req, res, next) => {
  const errors = await validate(req.body, schema);
  if (errors) return res.status(400).send(errors);
  else next();
};
