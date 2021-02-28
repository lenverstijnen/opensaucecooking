import { EntityService } from "../services/entity.service";
import { useObservable } from "./useObservable";

export function useEntity<T extends { _id: string }>(
  entityService: EntityService<T>,
  id: string
) {
  const initialValue = entityService.query.getEntity(id);
  const entity = useObservable(entityService.find(id), initialValue);
  return entity;
}
