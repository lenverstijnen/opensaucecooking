import mongoose, { Document, ObjectId } from "mongoose"

enum EenheidEnum {
  gram = "gram",
  liter = "liter",
}
export interface IIngredient {
  name: string
  quantity: number
  eenheid: EenheidEnum
}

export interface IRating {
  userId: ObjectId
  value: number
}
export interface IRecipe extends Document {
  name: string
  steps: string[]
  ingredients: IIngredient[]
  userId: ObjectId
  media: string[]
  rating: IRating[]
}

const Recipe = new mongoose.Schema({})
