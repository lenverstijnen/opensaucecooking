import { AxiosRequestConfig } from "axios";
import { ArrayOrT } from "../utils/array-or-t";
import httpService from "./http.service";

export type PartialWithId<T extends { _id: string }> = Partial<T> &
  Pick<T, "_id">;

export interface ICrudService<T extends { _id: string }> {
  all(): Promise<T[]>;
  find(id: string): Promise<T>;
  create(body: T): Promise<T>;
  update(body: ArrayOrT<PartialWithId<T>>): Promise<T | T[]>;
  updateMany(body: PartialWithId<T>[]): Promise<T[]>;
  remove(id: string): Promise<void>;
  post<B, R>(url: string, body?: B): Promise<R>;
}

function appendId(url: string, id: string) {
  return `${url}/${id}`;
}

export function createCrudService<T extends { _id: string }>(
  url: string
): ICrudService<T> {
  const all = async () => {
    const result = await httpService.get<T[]>(url);
    return result.data;
  };

  const find = async (id: string) => {
    const result = await httpService.get<T>(appendId(url, id));
    return result.data;
  };

  const create = async (body: T) => {
    const result = await httpService.post<T>(url, body);
    return result.data;
  };

  const updateMany = async (body: PartialWithId<T>[]) => {
    const result = await httpService.put<T[]>(url, body);
    return result.data;
  };

  const update = async (body: ArrayOrT<PartialWithId<T>>) => {
    if (body instanceof Array) {
      return updateMany(body);
    }

    const updateUrl = appendId(url, body._id);
    const result = await httpService.put<T>(updateUrl, body);
    return result.data;
  };

  const remove = async (id: string) => {
    const removeUrl = appendId(url, id);
    await httpService.delete<void>(removeUrl);
  };

  const post = async <B, R>(postUrl: string, body?: B) => {
    const result = await httpService.post<R>(`${url}/${postUrl}`, body);
    return result.data;
  };

  return {
    all,
    find,
    create,
    update,
    updateMany,
    remove,
    post,
  };
}
