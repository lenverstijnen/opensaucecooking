import { renderHook } from "@testing-library/react-hooks";
import { ICrudService } from "../services/crud.service";
import { mockCrudService } from "../services/crud.service.mock";
import { createEntityService, EntityService } from "../services/entity.service";
import { useEntity } from "./useEntity";

let entityService: EntityService<Test>;
let crudService: jest.Mocked<ICrudService<Test>>;
let item: Test;

beforeEach(() => {
  item = { _id: "a", val: 1 };
  crudService = mockCrudService();
  entityService = createEntityService<Test>("test", crudService);
});

it("should return undefined if it has no store value", async () => {
  crudService.find.mockRejectedValue(new Error("Not found"));
  const { result } = render();
  expect(result.current).toBeUndefined();
});

it("should return the initial value if it is in the store", () => {
  entityService.store.add(item);
  const { result } = render();
  expect(result.current).toEqual(item);
});

it("should return the value if it's updated later", async () => {
  const { result, waitForValueToChange } = render();
  entityService.store.set([item]);
  await waitForValueToChange(() => result.current);
  expect(result.current).toEqual(item);
});

function render() {
  return renderHook(() => useEntity(entityService, "a"));
}

interface Test {
  _id: string;
  val: number;
}
