import {
  createEntityQuery,
  createEntityStore,
  EntityState,
  EntityStore,
  getEntityType,
  getIDType,
  QueryEntity,
} from "@datorama/akita";
import { from } from "rxjs";
import { switchMap } from "rxjs/operators";
import { ArrayOrT } from "../utils/array-or-t";
import { createCrudService, ICrudService, PartialWithId } from "./crud.service";

export type PartialEntity<S extends EntityState> = PartialWithId<
  getEntityType<S>,
  getIDType<S>
>;

export function createEntityService<S extends EntityState>(
  name: string,
  crudService: ICrudService<getEntityType<S>> = createCrudService(name)
) {
  type T = getEntityType<S>;

  const store = createEntityStore<S>({}, { name, idKey: "_id" });
  const query = createEntityQuery<S>(store);
  const methods = createEntityServiceMethods(crudService, store, query);

  return {
    store,
    query,
    ...methods,
  };
}

export interface EntityServiceRequestOptions {
  refreshCache?: boolean;
}

function createEntityServiceMethods<S extends EntityState>(
  crudService: ICrudService<getEntityType<S>>,
  store: EntityStore<S>,
  query: QueryEntity<S>
) {
  type T = getEntityType<S>;

  const allRequest = async () => {
    const hasCache = store._cache().value;
    if (hasCache) return;

    const result = await crudService.all();
    store.set(result);
  };

  const all = ({ refreshCache }: EntityServiceRequestOptions = {}) => {
    if (refreshCache) store.setHasCache(false);
    const req = allRequest();

    return from(req).pipe(switchMap(() => query.selectAll()));
  };

  const findRequest = async (id: getIDType<S>) => {
    const result = await crudService.find(id);
    store.upsert(id, result);
    return result;
  };

  const find = (
    id: getIDType<S>,
    { refreshCache }: EntityServiceRequestOptions = {}
  ) => {
    const makeApiRequest = refreshCache || !query.hasEntity(id);
    const promise = makeApiRequest ? findRequest(id) : Promise.resolve();

    return from(promise).pipe(switchMap(() => query.selectEntity(id)));
  };

  const create = async (item: T) => {
    const result = await crudService.create(item);
    store.add(result);
  };

  const update = async (item: ArrayOrT<PartialEntity<S>>) => {
    const result = await crudService.update(item);
    const resultArray = Array.isArray(result) ? result : [result];
    store.upsertMany(resultArray);
  };

  const remove = async (id: getIDType<S>) => {
    await crudService.remove(id);
    store.remove(id);
  };

  return {
    all,
    find,
    create,
    update,
    remove,
  };
}

export type EntityService = ReturnType<typeof createEntityService>;
