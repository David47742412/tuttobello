import { Test } from '@nestjs/testing';
import { CategoryController } from '../../../../../src/api/v1/category/category.controller';
import { CategoryModel } from '../../../../../src/api/v1/category/model/category.model';
import { CategoryStub } from './stub/category.stub';
import { lastValueFrom, of } from 'rxjs';
import { CategoryService } from '../../../../../src/api/v1/category/category.service';
import { CategoryDto } from '../../../../../src/api/v1/category/dto/create-category.dto';
import { UpdateCategoryDto } from '../../../../../src/api/v1/category/dto/update-category.dto';

jest.mock('../../../../../src/api/v1/category/model/category.model');
jest.mock('../../../../../src/api/v1/category/category.service');

describe('CategoryController', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService, CategoryModel],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    jest.clearAllMocks();
  });

  it('should find all categories', () => {
    jest.spyOn(service, 'findAll').mockReturnValue(of(CategoryStub()));

    const resultPromise = lastValueFrom(service.findAll());
    expect(service.findAll).toBeCalled();

    return resultPromise.then((result) => {
      expect(result).toStrictEqual(CategoryStub());
    });
  });

  it('should create a new category', () => {
    jest.spyOn(service, 'create').mockReturnValue(of(CategoryStub()));

    const insert: CategoryDto = {
      wks: CategoryStub().body?.[0].wksCre,
      description: CategoryStub().body?.[0].description,
      ipReq: CategoryStub().body?.[0].ipReq,
    };
    const result = lastValueFrom(service.create(insert));
    expect(service.create).toBeCalledWith(insert);

    return result.then((data) => {
      expect(data).toStrictEqual(CategoryStub());
    });
  });

  it('should update a category', () => {
    jest.spyOn(service, 'update').mockReturnValue(of(CategoryStub()));

    const update: UpdateCategoryDto = {
      categoryId: '12345567',
      description: CategoryStub().body?.[0].description,
      wks: CategoryStub().body?.[0].wksCre,
      ipReq: CategoryStub().body?.[0].ipReq,
    };

    const result = lastValueFrom(service.update(update.categoryId, update));
    expect(service.update).toBeCalledWith(update.categoryId, update);

    return result.then((data) => {
      expect(data).toStrictEqual(CategoryStub());
    });
  });

  it('should delete a category', () => {
    jest.spyOn(service, 'remove').mockReturnValue(of(CategoryStub()));

    const remove: UpdateCategoryDto = {
      categoryId: '12345567',
      description: CategoryStub().body?.[0].description,
      wks: CategoryStub().body?.[0].wksCre,
      ipReq: CategoryStub().body?.[0].ipReq,
    };

    const result = lastValueFrom(service.remove(remove.categoryId, remove));
    expect(service.remove).toBeCalledWith(remove.categoryId, remove);

    return result.then((data) => {
      expect(data).toStrictEqual(CategoryStub());
    });
  });
});
