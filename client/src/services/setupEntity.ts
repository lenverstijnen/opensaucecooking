import { useEntities } from "../hooks/useEntities";
import { createUseEntity } from "../hooks/useEntity";
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
  return {
    useEntities: useEntities(entityService),
    useEntity: createUseEntity(entityService),
  };
}
