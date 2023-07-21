import { Injectable, Scope } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BookEntity } from '../../book/entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BookDetailEntity } from '../entities/book-detail.entity';
import { Observable } from 'rxjs';
import { IResponse } from '../../interface/response-api.interface';
import { FindBookDetailDto } from '../dto/find-book-detail.dto';

@Injectable({ scope: Scope.REQUEST })
export class BookDetailModel {
  constructor(
    @InjectRepository(BookEntity)
    private readonly _bookRepository: Repository<BookEntity>,
    @InjectRepository(BookDetailEntity)
    private readonly _bookDetailRepository: Repository<any>,
  ) {}

  find(filter: FindBookDetailDto) {
    const {
      bookId = '',
      bookName = '',
      bookDescription = '',
      userName = '',
      lastName = '',
      categoryName = '',
    } = filter;
    const responseApi: IResponse<FindBookDetailDto> = {
      statusCode: 200,
      message: '',
      count: 0,
      body: [],
    };
    return new Observable<IResponse<FindBookDetailDto>>((observer) => {
      const query = `CALL sp_find_book('${bookId}', '${bookName}', '${bookDescription}', '${userName}', '${lastName}', '${categoryName}')`;
      this._bookDetailRepository.query(query).then((e) => {
        responseApi.body = e[0] as FindBookDetailDto[];
        observer.next(responseApi);
        observer.complete();
      });
    });
  }

  insert() {}

  update() {}

  delete() {}
}
