import { useObservable } from "@libreact/use-observable";
import { EntityService } from "../services/entity.service";

export function useEntities<T extends { _id: string }>(
  entityService: EntityService<T>
) {
  const [entities] = useObservable(entityService.all(), []);

  return {
    entities,
    ...entityService,
  };
}

export function useEntity<T extends { _id: string }>(
  entityService: EntityService<T>,
  id: string
) {
  const initialValue = entityService.query.getEntity(id);
  const [entity] = useObservable(entityService.find(id), initialValue);
  return entity;
}

export function createUseEntities<T extends { _id: string }>(
  entityService: EntityService<T>
) {
  return function () {
    return useEntities<T>(entityService);
  };
}

export function createUseEntity<T extends { _id: string }>(
  entityService: EntityService<T>
) {
  return function (id: string | undefined) {
    if (!id) return;
    return useEntity(entityService, id);
  };
}
