import { EntityState, EntityStore, QueryEntity } from "@datorama/akita";
import { ICrudService } from "./crud.service";
import { mockCrudService } from "./crud.service.mock";
import { createEntityService } from "./entity.service";

interface TestEntity {
  _id: string;
}
interface TestState extends EntityState<TestEntity, string> {}

describe("EntityService", () => {
  const createTestService = () => createEntityService<TestEntity>("test");
  let entityService: ReturnType<typeof createTestService>;
  let crudService: ICrudService<TestEntity>;
  let testQuery: QueryEntity<TestState>;
  let testStore: EntityStore<TestState>;
  let mockItemA: TestEntity;
  let mockItemB: TestEntity;

  beforeEach(() => {
    crudService = mockCrudService();
    entityService = createEntityService("test", crudService);
    testQuery = entityService.query;
    testStore = entityService.store;
    mockItemA = { _id: "idA" };
    mockItemB = { _id: "idB" };
  });

  describe("all", () => {
    let testItems: TestEntity[];
    beforeEach(() => {
      testItems = [mockItemA, mockItemB];
      crudService.all = jest.fn().mockResolvedValue(testItems);
    });

    it("should get all items and add them to the store", (done) => {
      entityService.all().subscribe(() => {
        expect(testQuery.getAll()).toEqual(testItems);
        done();
      });
    });

    it("should not get the items again if they are cached", (done) => {
      testStore.setHasCache(true);
      entityService.all().subscribe(() => {
        expect(crudService.all).not.toHaveBeenCalled();
        done();
      });
    });

    it("should get the items again if they are cached but refreshCache is true", async (done) => {
      testStore.setHasCache(true);
      entityService.all({ refreshCache: true }).subscribe(() => {
        expect(crudService.all).toHaveBeenCalled();
        done();
      });
    });
  });

  it("should find an item and add it to the store", (done) => {
    crudService.find = jest.fn().mockResolvedValue(mockItemA);
    entityService.find("idA").subscribe((result) => {
      expect(result).toEqual(mockItemA);
      expect(testQuery.getEntity("idA")).toEqual(mockItemA);
      done();
    });
  });

  it("should create an item and add it to the store", async () => {
    const newItem = {
      _id: "id",
    };
    crudService.create = jest.fn().mockResolvedValue(newItem);
    await entityService.create(newItem);
    expect(testQuery.getAll()).toEqual([newItem]);
  });

  it("should update an item and update it to the store", async () => {
    const updatedVal = {
      _id: "id",
    };

    crudService.update = jest.fn().mockResolvedValue(updatedVal);

    await entityService.update(updatedVal);
    expect(testQuery.getAll()).toEqual([updatedVal]);
  });

  it("should update multiple items and update it to the store", async () => {
    const updatedVal = [{ _id: "id" }, { _id: "id2" }];
    crudService.update = jest.fn().mockResolvedValue(updatedVal);

    await entityService.update(updatedVal);
    expect(testQuery.getAll()).toEqual(updatedVal);
  });

  it("should delete an item and remove it from the store", async () => {
    testStore.set([{ _id: "id" }]);
    crudService.remove = jest.fn().mockReturnValue(Promise.resolve());
    await entityService.remove("id");
    expect(testQuery.getAll()).toEqual([]);
  });
});
