import { CategoryStub } from '../../../../../test/unit/api/v1/category/stub/category.stub';

export const CategoryService = jest.fn().mockReturnValue({
  create: jest.fn().mockReturnValue(CategoryStub()),
  findAll: jest.fn().mockReturnValue(CategoryStub()),
  update: jest.fn().mockReturnValue(CategoryStub()),
  remove: jest.fn().mockReturnValue(CategoryStub()),
});
