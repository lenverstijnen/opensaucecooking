import {
  createEntityQuery,
  createEntityStore,
  EntityState,
  EntityStore,
  QueryEntity,
} from "@datorama/akita";
import { from, Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { ArrayOrT } from "../utils/array-or-t";
import { createCrudService, ICrudService, PartialWithId } from "./crud.service";

export interface EntityServiceMethods<T extends { _id: string }> {
  all(token: string, opts?: EntityServiceRequestOptions): Observable<T[]>;
  find(
    token: string,
    id: string,
    opts?: EntityServiceRequestOptions
  ): Observable<T | undefined>;
  create(token: string, item: ArrayOrT<PartialWithId<T>>): Promise<void>;
  update(token: string, item: ArrayOrT<PartialWithId<T>>): Promise<void>;
  remove(token: string, id: string): Promise<void>;
}

export interface EntityService<T extends { _id: string }>
  extends EntityServiceMethods<T> {
  store: EntityStore<EntityState<T, string>>;
  query: QueryEntity<EntityState<T, string>>;
}

export function createEntityService<T extends { _id: string }>(
  name: string,
  crudService: ICrudService<T> = createCrudService(name)
): EntityService<T> {
  const store = createEntityStore<EntityState<T, string>>(
    {},
    { name, idKey: "_id" }
  );
  const query = createEntityQuery<EntityState<T, string>>(store);
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

function createEntityServiceMethods<T extends { _id: string }>(
  crudService: ICrudService<T>,
  store: EntityStore<EntityState<T, string>>,
  query: QueryEntity<EntityState<T, string>>
) {
  const allRequest = async (token: string) => {
    const hasCache = store._cache().value;
    if (hasCache) return;

    const result = await crudService.all(token);
    store.set(result);
  };

  const all = (
    token: string,
    { refreshCache }: EntityServiceRequestOptions = {}
  ) => {
    if (refreshCache) store.setHasCache(false);
    const req = allRequest(token);

    return from(req).pipe(switchMap(() => query.selectAll()));
  };

  const findRequest = async (token: string, id: string) => {
    const result = await crudService.find(token, id);
    store.upsert(id, result);
    return result;
  };

  const find = (
    token: string,
    id: string,
    { refreshCache }: EntityServiceRequestOptions = {}
  ) => {
    const makeApiRequest = refreshCache || !query.hasEntity(id);
    const promise = makeApiRequest ? findRequest(token, id) : Promise.resolve();

    return from(promise).pipe(switchMap(() => query.selectEntity(id)));
  };

  const create = async (token: string, item: T) => {
    const result = await crudService.create(token, item);
    store.add(result);
  };

  const update = async (token: string, item: ArrayOrT<PartialWithId<T>>) => {
    const result = await crudService.update(token, item);
    const resultArray = Array.isArray(result) ? result : [result];
    store.upsertMany(resultArray);
  };

  const remove = async (token: string, id: string) => {
    await crudService.remove(token, id);
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
