import { Express } from "express"
import bodyParser from "body-parser"
import cors from "cors"

// Routes
import recipe from "../routes/recipe"

export const startRoutes = (app: Express) => {
  app.use(bodyParser.json())
  app.use(cors())

  app.use("/api/recipe/", recipe)
}
