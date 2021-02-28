import { QueryEntity } from "@datorama/akita";
import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { createCrudService, ICrudService } from "../services/crud.service";
import { mockCrudService } from "../services/crud.service.mock";
import { createEntityService, EntityService } from "../services/entity.service";
import { nextTick } from "../utils/nextTick";
import { useEntity } from "./useEntity";

let entityService: EntityService<Test>;
let crudService: jest.Mocked<ICrudService<Test>>;
let item: Test;

beforeEach(() => {
  item = { _id: "a", val: 1 };
  crudService = mockCrudService();
  crudService.find.mockResolvedValue(item);
  entityService = createEntityService<Test>("test", crudService);
});

it("should return undefined if it has no store value", () => {
  const { result } = render();
  expect(result.current).toBeUndefined();
});

it("should return the initial value if it is in the store", () => {
  act(() => {
    entityService.store.add(item);
  });
  const { result } = render();
  expect(result.current).toEqual(item);
});

it("should return the value if it's updated later", async () => {
  const { result, waitForValueToChange } = render();
  entityService.store.set([item]);
  await waitForValueToChange(() => result.current);
  expect(result.current).toEqual(item);
});

fit("should return undefined if the entity is removed later", async () => {
  entityService.store.set([item]);
  const { result, waitForValueToChange } = render();
  entityService.store.set([]);
  await waitForValueToChange(() => result.current);
  console.log(result.all);
  expect(result.current).toBeUndefined();
});

function render() {
  return renderHook(() => useEntity(entityService, "a"));
}

interface Test {
  _id: string;
  val: number;
}
