import { EntityService } from "../../services/entity.service";
import { useObservable } from "../useObservable";

export function useEntityFind<T extends { _id: string }>(
  entityService: EntityService<T>,
  id?: string
) {
  const initialValue = id ? entityService.query.getEntity(id) : undefined;
  return useObservable(id ? entityService.find(id) : undefined, initialValue);
}
