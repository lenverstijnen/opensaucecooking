import { RequestHandler } from "express"
import recipeService from "../../services/recipeService"

export const getAll: RequestHandler = async (req, res) => {
  const recipes = await recipeService.getAll()

  res.send(recipes)
}
