import { RequestHandler } from "express"
import recipeService from "../../services/recipeService"

export const create: RequestHandler = async (req, res) => {
  const recipe = await recipeService.create(req.body)

  res.send(recipe)
}
