import { EntityService } from "../../services/entity.service";
import { createEntityHooks } from "./createEntityHooks";

it("should create entity hooks", () => {
  const hooks = createEntityHooks({} as EntityService, "test");
  expect(hooks.useEntity).toBeInstanceOf(Function);
  expect(hooks.useEntities).toBeInstanceOf(Function);
});
