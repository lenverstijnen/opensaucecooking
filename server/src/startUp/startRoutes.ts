import { Express } from "express";

// Routes
import recipe from "../routes/recipe";

export const startRoutes = (app: Express) => {
  app.use("/api/recipe/", recipe);
};
