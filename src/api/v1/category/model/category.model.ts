import { Injectable, Scope } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { CategoryDto } from '../dto/create-category.dto';
import { IResponse } from '../../interface/response-api.interface';
import { v4 as uuid } from 'uuid';
import { UpdateCategoryDto } from '../dto/update-category.dto';

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

  insert(category: CategoryDto) {
    const responseApi: IResponse<CategoryEntity> = {
      statusCode: 200,
      message: '',
      count: 0,
      body: [],
    };
    return new Observable<IResponse<CategoryEntity>>((observer) => {
      try {
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
              observer.next(e);
              observer.complete();
            });
          });
      } catch (ex: any) {
        responseApi.statusCode = 500;
        responseApi.message = `Ha Ocurrido un Error:\n${ex.message}`;
        observer.next(responseApi);
        observer.complete();
      }
    });
  }

  update(id: string, update: UpdateCategoryDto) {
    const responseApi: IResponse<CategoryEntity> = {
      statusCode: 200,
      message: '',
      count: 0,
      body: [],
    };
    return new Observable<IResponse<CategoryEntity>>((observer) => {
      try {
        this._repository
          .update(id, {
            wksMod: update.wks,
            ipReq: update.ipReq,
            description: update.description,
          })
          .then(() => {
            this.find().subscribe((e) => {
              observer.next(e);
              observer.complete();
            });
          });
      } catch (ex: any) {
        responseApi.statusCode = 500;
        responseApi.message = `Ha Ocurrido un Error:\n${ex.message}`;
        observer.next(responseApi);
        observer.complete();
      }
    });
  }

  delete(id: string, update: UpdateCategoryDto) {
    const responseApi: IResponse<CategoryEntity> = {
      statusCode: 200,
      message: '',
      count: 0,
      body: [],
    };
    return new Observable((observer) => {
      try {
        this._repository
          .update(id, {
            flgElm: true,
            ipReq: update.ipReq,
            wksMod: update.wks,
          })
          .then(() => {
            this.find().subscribe((e) => {
              observer.next(e);
              observer.complete();
            });
          });
      } catch (ex: any) {
        responseApi.statusCode = 500;
        responseApi.message = `Ha Ocurrido un Error:\n${ex.message}`;
        observer.next(responseApi);
        observer.complete();
      }
    });
  }
}
