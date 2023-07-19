import { Injectable, Scope } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { IResponse } from '../../interface/response-api.interface';
import { v4 as uuid } from 'uuid';

@Injectable({ scope: Scope.REQUEST })
export class CategoryModel {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly _repository: Repository<CategoryEntity>,
  ) {}

  find() {
    const responseApi: IResponse<CategoryEntity> = {
      statusCode: 200,
      message: '',
      count: 0,
      body: [],
    };
    return new Observable<IResponse<CategoryEntity>>((observer) => {
      this._repository
        .find({
          where: { flgElm: false },
          select: ['categoryId', 'description'],
        })
        .then((e) => {
          responseApi.body = e;
          observer.next(responseApi);
          observer.complete();
        });
    });
  }

  insert(category: CreateCategoryDto) {
    const responseApi: IResponse<CategoryEntity> = {
      statusCode: 200,
      message: '',
      count: 0,
      body: [],
    };
    return new Observable<IResponse<CategoryEntity>>((observer) => {
      this._repository
        .insert({
          categoryId: uuid(),
          description: category.description,
          ipReq: category.ipReq,
          wksMod: category.wks,
          wksCre: category.wks,
        })
        .then(() => {
          this.find().subscribe((e) => {
            responseApi.body = e.body;
            observer.next(responseApi);
            observer.complete();
          });
        });
    });
  }
}
