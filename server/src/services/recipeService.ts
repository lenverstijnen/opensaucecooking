import { Recipe, IRecipe } from "../models/Recipe";

const create = (input: IRecipe) => Recipe.create(input);

const deleteRecipe = (id: string) => Recipe.findByIdAndDelete(id);

const findById = (id: string) => Recipe.findById(id);

const getAll = () => Recipe.find({});

const update = (id: string, updated: IRecipe) =>
  Recipe.findByIdAndUpdate(id, updated, { new: true });

const like = (id: string, userId: string) =>
  Recipe.findByIdAndUpdate(id, { $addToSet: { likes: userId } });

const unlike = (id: string, userId: string) =>
  Recipe.findByIdAndUpdate(id, { $pull: { likes: userId } });

export default {
  create,
  delete: deleteRecipe,
  findById,
  getAll,
  update,
  like,
  unlike,
};
