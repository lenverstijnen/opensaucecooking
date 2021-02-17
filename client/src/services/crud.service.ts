import { AxiosRequestConfig } from "axios";
import { ArrayOrT } from "../utils/array-or-t";
import httpService from "./http.service";

export type PartialWithId<T extends { _id: string }> = Partial<T> &
  Pick<T, "_id">;

export interface ICrudService<T extends { _id: string }> {
  all(token: string): Promise<T[]>;
  find(token: string, id: string): Promise<T>;
  create(token: string, body: T): Promise<T>;
  update(token: string, body: ArrayOrT<PartialWithId<T>>): Promise<T | T[]>;
  updateMany(token: string, body: PartialWithId<T>[]): Promise<T[]>;
  remove(token: string, id: string): Promise<void>;
}

function appendId(url: string, id: string) {
  return `${url}/${id}`;
}

function authHeader(token: string, config?: AxiosRequestConfig) {
  return {
    ...config,
    headers: {
      ...config?.headers,
      Authorization: `Bearer ${token}`,
    },
  };
}

export function createCrudService<T extends { _id: string }>(
  url: string
): ICrudService<T> {
  const all = async (token: string) => {
    const result = await httpService.get<T[]>(url, authHeader(token));
    return result.data;
  };

  const find = async (token: string, id: string) => {
    const result = await httpService.get<T>(
      appendId(url, id),
      authHeader(token)
    );
    return result.data;
  };

  const create = async (token: string, body: T) => {
    const result = await httpService.post<T>(url, body, authHeader(token));
    return result.data;
  };

  const updateMany = async (token: string, body: PartialWithId<T>[]) => {
    const result = await httpService.put<T[]>(url, body, authHeader(token));
    return result.data;
  };

  const update = async (token: string, body: ArrayOrT<PartialWithId<T>>) => {
    if (body instanceof Array) {
      return updateMany(token, body);
    }

    const updateUrl = appendId(url, body._id);
    const result = await httpService.put<T>(updateUrl, body, authHeader(token));
    return result.data;
  };

  const remove = async (token: string, id: string) => {
    const removeUrl = appendId(url, id);
    await httpService.delete<void>(removeUrl, authHeader(token));
  };

  return {
    all,
    find,
    create,
    update,
    updateMany,
    remove,
  };
}
