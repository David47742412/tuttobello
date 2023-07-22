import { Test } from '@nestjs/testing';
import { CategoryController } from '../../../../../src/api/v1/category/category.controller';
import { CategoryModel } from '../../../../../src/api/v1/category/model/category.model';
import { CategoryEntity } from '../../../../../src/api/v1/category/entities/category.entity';
import { CategoryStub } from './stub/category.stub';
import { Observable } from 'rxjs';
import { IResponse } from '../../../../../src/api/v1/interface/response-api.interface';
import { CategoryService } from '../../../../../src/api/v1/category/category.service';

jest.mock('../../../../../src/api/v1/category/model/category.model');
jest.mock('../../../../../src/api/v1/category/category.service');

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService, CategoryModel],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    let category: Observable<IResponse<CategoryEntity>>;
    beforeEach(() => {
      category = controller.findAll();
    });

    test('then it should call controller.findAll', () => {
      expect(controller.findAll);
    });

    test('then it should return the category', () => {
      expect(category).toEqual(CategoryStub());
    });
  });
});
