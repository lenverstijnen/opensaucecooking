import { useEffect, useState } from "react";
import { EntityService } from "../services/entity.service";

export function useEntities<T extends { _id: string }>(
  entityService: EntityService<T>
) {
  const [entities, setEntities] = useState<T[]>([]);

  // TODO: refactor in seperate hook
  useEffect(() => {
    const subscription = getEntities();

    return () => {
      subscription.then((sub) => {
        sub.unsubscribe();
      });
    };
  }, []);

  const getEntities = async () => {
    return entityService.all().subscribe((data) => {
      setEntities(data);
    });
  };

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
  const [entity, setEntity] = useState(initialValue);

  useEffect(() => {
    const subscription = selectEntity();

    return () => {
      subscription.then((sub) => {
        sub.unsubscribe();
      });
    };
  }, []);

  const selectEntity = async () => {
    return entityService.find(id).subscribe((entity) => {
      setEntity(entity);
    });
  };

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
  return function (id: string) {
    return useEntity(entityService, id);
  };
}
