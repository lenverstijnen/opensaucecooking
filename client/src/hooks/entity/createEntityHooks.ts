import { EntityService } from "../../services/entity.service";
import { useEntityAll } from "./useEntityAll";
import { useEntityFind } from "./useEntityFind";

export function createEntityHooks<T extends { _id: string }>(
  entityService: EntityService<T>
) {
  return {
    useEntities: () => useEntityAll(entityService),
    useEntity: (id?: string) => useEntityFind(entityService, id),
  };
}
