import { createUseEntities } from "../hooks/useEntity";
import { createEntityService, EntityService } from "./entity.service";

export function setupEntity(name: string) {
  const entityService = createEntityService(name);
  const hooks = setupEntityHooks(entityService);

  return {
    entityService,
    ...hooks,
  };
}

export function setupEntityHooks<T extends { _id: string }>(
  entityService: EntityService<T>
) {
  const useEntities = createUseEntities(entityService);
  const useEntity = createUseEntities(entityService);

  return {
    useEntities,
    useEntity,
  };
}
