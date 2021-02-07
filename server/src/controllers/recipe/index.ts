import { create } from "./create"
import { getAll } from "./getAll"
import { deleteRecipe } from "./delete"
import { getOne } from "./getOne"

export default {
  getOne,
  create,
  getAll,
  delete: deleteRecipe,
}
