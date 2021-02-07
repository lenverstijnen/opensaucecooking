import { RequestHandler } from "express"
import recipeService from "../../services/recipeService"

export const update: RequestHandler = async (req, res) => {
  const recipe = await recipeService.update(req.params.id, req.body)
  if (!recipe) return res.sendStatus(404)
  else res.send(recipe)
}
