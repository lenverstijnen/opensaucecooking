import { EntityService } from "../../services/entity.service";
import { useObservable } from "../useObservable";

export function useEntityFind<T extends { _id: string }>(
  entityService: EntityService<T>,
  id: string
) {
  const initialValue = entityService.query.getEntity(id);
  return useObservable(entityService.find(id), initialValue);
}
