import { wait } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { createEntityService, EntityService } from "../services/entity.service";
import { useEntities } from "./useEntities";

jest.mock("../services/http.service", () => ({
  get: jest.fn().mockResolvedValue([]),
}));

interface Test {
  _id: string;
  val: number;
}

let entityService: EntityService<Test>;
let item: Test;
let item2: Test;

beforeEach(() => {
  entityService = createEntityService("test");
  item = { _id: "a", val: 1 };
  item2 = { _id: "b", val: 2 };
});

it("should return an inital empty array", () => {
  const { result } = render();
  expect(result.current.entities).toEqual([]);
  expect(result.current.entityIds).toEqual([]);
});

it("should return an inital array of items if available", async () => {
  entityService.store.set([item, item2]);
  const { result, waitForValueToChange } = render();
  await waitForValueToChange(() => result.current);
  expect(result.current.entities).toEqual([item, item2]);
  expect(result.current.entityIds).toEqual([item._id, item2._id]);
});

it("should return an array of items if it is set later", async () => {
  entityService.store.set([]);
  const { result, waitForValueToChange } = render();
  entityService.store.set([item, item2]);
  await waitForValueToChange(() => result.current);
  expect(result.current.entities).toEqual([item, item2]);
  expect(result.current.entityIds).toEqual([item._id, item2._id]);
});

it("should return initial loading state when still loading", () => {
  const { result } = render();
  expect(result.current.loading).toBe(true);
});

it("should return initial loading state when already finished loading", () => {
  entityService.store.setLoading(false);
  const { result } = render();
  expect(result.current.loading).toBe(false);
});

it("should return loading state if it's changed later to false", async () => {
  const { result, waitForValueToChange } = render();
  entityService.store.setLoading(false);
  await waitForValueToChange(() => result.current);
  expect(result.current.loading).toBe(false);
});

it("should return loading state if it's changed later to true", async () => {
  entityService.store.set([]);
  const { result, waitForValueToChange } = render();
  entityService.store.setLoading(true);
  await waitForValueToChange(() => result.current);
  expect(result.current.loading).toBe(true);
});

function render() {
  return renderHook(() => useEntities(entityService));
}
