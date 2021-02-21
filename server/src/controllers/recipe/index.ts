import { create } from "./create";
import { deleteRecipe } from "./delete";
import { getAll } from "./getAll";
import { getOne } from "./getOne";
import { update } from "./update";
import { like } from "./like";
import { unlike } from "./unlike";

export default {
  create,
  delete: deleteRecipe,
  getAll,
  getOne,
  update,
  like,
  unlike,
};
