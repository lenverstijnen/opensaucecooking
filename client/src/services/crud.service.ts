import { allow } from "joi";
import httpService from "./http.service";

async function all<T>(url: string) {
  const result = await httpService.get<T[]>(url);
  return result.data;
}

export default {
  all,
};
