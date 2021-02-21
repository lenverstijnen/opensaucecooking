import { Recipe } from ".";
import { createEntityService } from "../../../services/entity.service";

const entityService = createEntityService<Recipe>("recipe");

async function like(recipeId: string, userId: string) {
  addLikeToStore(recipeId, userId);

  const result = await entityService.post<Recipe>(`${recipeId}/like/${userId}`);
  entityService.store.update(result._id, result);
}

async function unlike(recipeId: string, userId: string) {
  removeLikeFromStore(recipeId, userId);

  const result = await entityService.post<Recipe>(
    `${recipeId}/unlike/${userId}`
  );
  entityService.store.update(result._id, result);
}

function removeLikeFromStore(recipeId: string, userId: string) {
  entityService.store.update(recipeId, (state) => ({
    likes: state.likes.filter((like) => like !== userId),
  }));
}

function addLikeToStore(recipeId: string, userId: string) {
  entityService.store.update(recipeId, (state) => ({
    likes: [...state.likes, userId],
  }));
}

export const recipeService = {
  ...entityService,
  like,
  unlike,
};
