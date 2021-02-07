import { ObjectId } from "mongoose"
import { Recipe, IRecipe } from "../models/Recipe"

const getAll = () => Recipe.find({})

const findById = (id: string) => Recipe.findById(id)

const create = (input: IRecipe) => Recipe.create(input)

const deleteRecipe = (id: string) => Recipe.findByIdAndDelete(id)

export default {
  findById,
  getAll,
  create,
  delete: deleteRecipe,
}
