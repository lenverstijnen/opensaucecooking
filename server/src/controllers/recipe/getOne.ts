import { RequestHandler } from "express"
import recipeService from "../../services/recipeService"

export const getOne: RequestHandler = async (req, res) => {
  const recipe = await recipeService.findById(req.params.id)
  if (!recipe) return res.sendStatus(404)
  else res.send(recipe)
}
