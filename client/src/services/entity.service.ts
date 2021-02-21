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
import httpService from "./http.service";

export interface EntityServiceMethods<T extends { _id: string }> {
  all(opts?: EntityServiceRequestOptions): Observable<T[]>;
  find(
    id: string,
    opts?: EntityServiceRequestOptions
  ): Observable<T | undefined>;
  create(item: ArrayOrT<PartialWithId<T>>): Promise<void>;
  update(item: ArrayOrT<PartialWithId<T>>): Promise<void>;
  remove(id: string): Promise<void>;
  post<B, R>(url: string, body?: B): Promise<R>;
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
  const allRequest = async () => {
    const hasCache = false || store._cache().value;
    if (hasCache) return;

    const result = await crudService.all();
    store.set(result);
  };

  const all = ({ refreshCache }: EntityServiceRequestOptions = {}) => {
    store.setHasCache(false);
    if (refreshCache) store.setHasCache(false);
    const req = allRequest();

    return from(req).pipe(switchMap(() => query.selectAll()));
  };

  const findRequest = async (id: string) => {
    const result = await crudService.find(id);
    store.upsert(id, result);
    return result;
  };

  const find = (
    id: string,
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

  const update = async (item: ArrayOrT<PartialWithId<T>>) => {
    const result = await crudService.update(item);
    const resultArray = Array.isArray(result) ? result : [result];
    store.upsertMany(resultArray);
  };

  const remove = async (id: string) => {
    await crudService.remove(id);
    store.remove(id);
  };

  return {
    all,
    find,
    create,
    update,
    remove,
    post: crudService.post,
  };
}
