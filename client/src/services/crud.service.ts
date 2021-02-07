import { allow } from "joi";
import httpService from "./http.service";

async function all<T>(url: string, token: string) {
  const result = await httpService.get<T[]>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result.data;
}

export default {
  all,
};
