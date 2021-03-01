import { EntityService } from "../services/entity.service";
import { useObservable } from "./useObservable";

export function useEntity<T extends { _id: string }>(
  entityService: EntityService<T>,
  id: string
) {
  const initialValue = entityService.query.getEntity(id);
  return useObservable(entityService.find(id), initialValue);
}

export function createUseEntity<T extends { _id: string }>(
  entityService: EntityService<T>
) {
  return (id: string) => useEntity(entityService, id);
}
