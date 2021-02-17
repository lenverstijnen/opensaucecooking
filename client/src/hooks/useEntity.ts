import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { EntityService } from "../services/entity.service";

export function useEntityService<T extends { _id: string }>(
  entityService: EntityService<T>
) {
  const [entities, setEntities] = useState<T[]>([]);
  const [entityIds, setEntityIds] = useState<string[]>();
  const { getAccessTokenSilently } = useAuth0();

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
    const token = await getAccessTokenSilently();
    return entityService.all(token).subscribe((data) => {
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
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const subscription = selectEntity();

    return () => {
      subscription.then((sub) => {
        sub.unsubscribe();
      });
    };
  }, []);

  const selectEntity = async () => {
    const token = await getAccessTokenSilently();
    return entityService.find(token, id).subscribe((entity) => {
      setEntity(entity);
    });
  };

  return entity;
}

export function createUseEntityService<T extends { _id: string }>(
  entityService: EntityService<T>
) {
  return function () {
    return useEntityService<T>(entityService);
  };
}
