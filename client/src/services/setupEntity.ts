import { createUseEntities, createUseEntity } from "../hooks/useEntity";
import { createEntityService, EntityService } from "./entity.service";

export function setupEntity<T extends { _id: string }>(name: string) {
  const entityService = createEntityService<T>(name);
  const hooks = setupEntityHooks<T>(entityService);

  return {
    entityService,
    ...hooks,
  };
}

export function setupEntityHooks<T extends { _id: string }>(
  entityService: EntityService<T>
) {
  const useEntities = createUseEntities<T>(entityService);
  const useEntity = createUseEntity<T>(entityService);

  return {
    useEntities,
    useEntity,
  };
}
