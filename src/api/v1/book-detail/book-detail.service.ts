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

  update(id: number, updateBookDetailDto: UpdateBookDetailDto) {
    return `This action updates a #${id} bookDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookDetail`;
  }
}
