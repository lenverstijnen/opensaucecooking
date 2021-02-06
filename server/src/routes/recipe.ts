import express from "express"
import recipe from "../controllers/recipe/"

const router = express.Router()

router.get("/", recipe.getAll)

router.post("/", recipe.create)

export default router
