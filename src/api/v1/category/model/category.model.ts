import { Injectable, Scope } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { from, lastValueFrom } from 'rxjs';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { IResponse } from '../../interface/response-api.interface';
import { v4 as uuid } from 'uuid';

@Injectable({ scope: Scope.REQUEST })
export class CategoryModel {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly _repository: Repository<CategoryEntity>,
  ) {}

  async find() {
    const responseApi: IResponse<CategoryEntity> = {
      statusCode: 200,
      message: '',
      count: 0,
      body: [],
    };
    responseApi.body = await this._repository.find({
      where: { flgElm: false },
      select: ['categoryId', 'description'],
    });
    return responseApi;
  }

  async insert(category: CreateCategoryDto) {
    const responseApi: IResponse<CategoryEntity> = {
      statusCode: 200,
      message: '',
      count: 0,
      body: [],
    };
    try {
      await lastValueFrom(
        from(
          this._repository.insert({
            categoryId: uuid(),
            description: category.description,
            ipReq: category.ipReq,
            wksMod: category.wks,
            wksCre: category.wks,
          }),
        ),
      );
    } catch (ex: any) {
      console.log(ex.message);
    }
    responseApi.body = await this._repository.find({
      where: { flgElm: false },
      select: ['categoryId', 'description'],
    });
    return responseApi;
  }
}
