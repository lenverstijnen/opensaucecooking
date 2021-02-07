import { Recipe, IRecipe } from "../models/Recipe"

const create = (input: IRecipe) => Recipe.create(input)

const deleteRecipe = (id: string) => Recipe.findByIdAndDelete(id)

const findById = (id: string) => Recipe.findById(id)

const getAll = () => Recipe.find({})

const update = (id: string, updated: IRecipe) =>
  Recipe.findByIdAndUpdate(id, updated, { new: true })

export default {
  create,
  delete: deleteRecipe,
  findById,
  getAll,
  update,
}
