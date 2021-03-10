import { EntityStore, QueryEntity } from "@datorama/akita";
import { renderHook } from "@testing-library/react-hooks";
import { IUser } from "../../../common/interfaces/IUser";
import { userService, useUser, useUsers } from "./user.store";

const jamie: IUser = {
  _id: "j",
  firstName: "Jamie",
};

const gordon: IUser = {
  _id: "g",
  firstName: "Gordon",
};

it("should create an user entity service", () => {
  const { query, store } = userService;
  expect(query).toBeInstanceOf(QueryEntity);
  expect(store).toBeInstanceOf(EntityStore);
});

it("should create useUser hook and get a user", async () => {
  userService.store.set([jamie]);
  const { result } = renderHook(() => useUser("j"));
  expect(result.current).toEqual(jamie);
});
