import { QueryEntity } from "@datorama/akita";
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

it("should return the value if it's updated later", () => {
  const { result, rerender } = render();
  act(() => {
    entityService.store.set([item]);
  });

  expect(result.current).toEqual(item);
});

function render() {
  const renderResult = renderHook(() => useEntity(entityService, "a"));
  return {
    ...renderResult,
    entityService,
  };
}

interface Test {
  _id: string;
  val: number;
}
