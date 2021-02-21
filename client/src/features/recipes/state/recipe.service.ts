import { Recipe } from ".";
import { createEntityService } from "../../../services/entity.service";

const entityService = createEntityService<Recipe>("recipe");

async function like(recipeId: string, userId: string) {
  return entityService.post(`${recipeId}/like/${userId}`);
}

async function unlike(recipeId: string, userId: string) {
  return entityService.post(`${recipeId}/unlike/${userId}`);
}

export const recipeService = {
  ...entityService,
  like,
  unlike,
};
