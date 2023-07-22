import { Injectable, Scope } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BookEntity } from '../../book/entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BookDetailEntity } from '../entities/book-detail.entity';
import { Observable } from 'rxjs';
import { IResponse } from '../../interface/response-api.interface';
import { FindBookDetailDto } from '../dto/find-book-detail.dto';
import { CreateBookDetailDto } from '../dto/create-book-detail.dto';
import { v4 as uuid } from 'uuid';

@Injectable({ scope: Scope.REQUEST })
export class BookDetailModel {
  constructor(
    @InjectRepository(BookEntity)
    private readonly _bookRepository: Repository<BookEntity>,
    @InjectRepository(BookDetailEntity)
    private readonly _bookDetailRepository: Repository<BookDetailEntity>,
    private readonly _connection: DataSource,
  ) {}

  find(filter: FindBookDetailDto) {
    filter = filter ?? new FindBookDetailDto();
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

  insert(bookDetail: CreateBookDetailDto, usrId: string) {
    const responseApi: IResponse<FindBookDetailDto> = {
      statusCode: 200,
      message: '',
      count: 0,
      body: [],
    };
    const queryRunner = this._connection.createQueryRunner();
    return new Observable<IResponse<FindBookDetailDto>>((observer) => {
      try {
        queryRunner.startTransaction().then((e) => e);
        const bookId: string = uuid();
        this._bookRepository
          .insert({
            bookId,
            name: bookDetail.nameBook,
            description: bookDetail.descriptionBook,
            ipReq: bookDetail.ipReq,
            wksMod: bookDetail.wks,
            wksCre: bookDetail.wks,
          })
          .then((e) => e);
        this._bookDetailRepository
          .insert({
            book: {
              bookId,
            },
            flgElm: false,
            category: {
              categoryId: bookDetail.categoryId,
            },
            user: {
              usrId: usrId,
            },
          })
          .then(() => {
            this.find({}).subscribe((e) => {
              observer.next(e);
              observer.complete();
            });
          });
      } catch (ex: any) {
        responseApi.message =
          'Ha ocurrido un Error al momento de guardar los datos';
        responseApi.statusCode = 500;
        queryRunner.rollbackTransaction().then((e) => e);
        console.log(ex.message);
        observer.next(responseApi);
        observer.complete();
      }
    });
  }

  //update() {}

  //delete() {}
}
