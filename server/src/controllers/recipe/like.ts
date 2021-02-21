import { RequestHandler } from "express";
import recipeService from "../../services/recipeService";

interface RequestParams {
  id: string;
  userId: string;
}

export const like: RequestHandler<RequestParams> = async (req, res) => {
  const id = req.params.id;
  // TODO: add to token with middleware
  const userId = req.params.userId;
  const recipe = await recipeService.like(id, userId);
  res.send(recipe);
};
