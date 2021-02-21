import express from "express";
import recipe from "../controllers/recipe/";
import { validateRecipe } from "../validation/validateRecipe";
import { validateId } from "../validation/validateId";

const router = express.Router();

router.get("/", recipe.getAll);

router.get("/:id", [validateId], recipe.getOne);

router.post("/", [validateRecipe], recipe.create);

router.put("/:id", [validateId, validateRecipe], recipe.update);

router.delete("/:id", [validateId], recipe.delete);

router.post(":id/like/:userId", recipe.like);

router.post(":id/unlike/:userId", recipe.unlike);

export default router;
