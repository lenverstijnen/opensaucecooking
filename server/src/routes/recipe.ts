import express from "express"
import recipe from "../controllers/recipe/"
import { validateRecipe } from "../validation/validateRecipe"

const router = express.Router()

router.get("/", recipe.getAll)

router.post("/", [validateRecipe], recipe.create)

export default router
