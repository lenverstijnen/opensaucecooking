import { Recipe } from ".";
import { createEntityService } from "../../../services/entity.service";

const entityService = createEntityService<Recipe>("recipe");

async function like(recipeId: string, userId: string) {
  const result = await entityService.post<Recipe>(`${recipeId}/like/${userId}`);
  entityService.store.upsert(result._id, result);
}

async function unlike(recipeId: string, userId: string) {
  const result = await entityService.post<Recipe>(
    `${recipeId}/unlike/${userId}`
  );
  entityService.store.upsert(result._id, result);
}

export const recipeService = {
  ...entityService,
  like,
  unlike,
};
