import { CategoryEntity } from '../../../../../../src/api/v1/category/entities/category.entity';
import { IResponse } from '../../../../../../src/api/v1/interface/response-api.interface';

export const CategoryStub = (): IResponse<CategoryEntity> => {
  return {
    statusCode: 200,
    message: '',
    count: 0,
    body: [
      {
        categoryId: 'Category id',
        description: 'Category description',
        ipReq: '::1',
        wksMod: 'mocksMod',
        wksCre: 'mocksCre',
        flgElm: false,
        fchCre: '2023/07/22',
        fchMod: '2023/07/22',
      },
    ],
  };
};
