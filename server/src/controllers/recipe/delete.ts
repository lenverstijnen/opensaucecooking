import { RequestHandler } from "express"
import recipeService from "../../services/recipeService"

export const deleteRecipe: RequestHandler = async (req, res) => {
  const id = req.params.id

  const recipe = await recipeService.delete(id)
  if (!recipe) return res.sendStatus(404)

  res.send(recipe)
}
