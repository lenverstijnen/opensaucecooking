import { ICrudService } from "./crud.service";

export const mockCrudService = <T extends { _id: string }>(): jest.Mocked<
  ICrudService<T>
> => ({
  create: jest.fn(),
  all: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  updateMany: jest.fn(),
  remove: jest.fn(),
  post: jest.fn(),
});
