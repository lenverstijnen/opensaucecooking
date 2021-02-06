import { create } from "./create"
import { getAll } from "./getAll"
import { deleteRecipe } from "./delete"

export default {
  create,
  getAll,
  delete: deleteRecipe,
}
