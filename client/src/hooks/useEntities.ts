import { EntityService } from "../services/entity.service";
import { useObservable } from "./useObservable";

export function useEntities<T extends { _id: string }>(
  entityService: EntityService<T>
) {
  const entities = useObservable(entityService.all(), []);
  const entityIds = entities.map((x) => x._id);
  const loading = useObservable(entityService.query.selectLoading(), true);

  return {
    entities,
    entityIds,
    loading,
    ...entityService,
  };
}
