import { IUser } from "../../../common/interfaces/IUser";
import { createEntityHooks } from "../../../hooks/entity/createEntityHooks";
import { createEntityService } from "../../../services/entity.service";

export const userService = createEntityService<IUser>("user");

export const { useEntity: useUser } = createEntityHooks(userService);
