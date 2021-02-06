import { Recipe, IRecipe } from "../models/Recipe"

const getAll = () => Recipe.find({})

const create = (input: IRecipe) => Recipe.create(input)

export default {
  getAll,
  create,
}
