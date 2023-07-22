import { Injectable } from '@nestjs/common';
import { CreateBookDetailDto } from './dto/create-book-detail.dto';
import { UpdateBookDetailDto } from './dto/update-book-detail.dto';
import { BookDetailModel } from './model/book-detail.model';
import { FindBookDetailDto } from './dto/find-book-detail.dto';

@Injectable()
export class BookDetailService {
  constructor(private readonly _model: BookDetailModel) {}

  create(createBookDetailDto: CreateBookDetailDto, usrId: string) {
    return this._model.insert(createBookDetailDto, usrId);
  }

  findAll(filter: FindBookDetailDto) {
    return this._model.find(filter);
  }

  update(id: string, bookModel: CreateBookDetailDto, userId: string) {
    return this._model.update(id, bookModel, userId);
  }

  remove(id: string, bookModel: CreateBookDetailDto, userId: string) {
    return this._model.delete(id, bookModel, userId);
  }
}
