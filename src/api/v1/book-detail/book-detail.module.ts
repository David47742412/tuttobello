import { Module } from '@nestjs/common';
import { BookDetailService } from './book-detail.service';
import { BookDetailController } from './book-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookDetailEntity } from './entities/book-detail.entity';
import { BookEntity } from '../book/entities/book.entity';
import { BookDetailModel } from './model/book-detail.model';

@Module({
  imports: [TypeOrmModule.forFeature([BookDetailEntity, BookEntity])],
  controllers: [BookDetailController],
  providers: [BookDetailService, BookDetailModel],
})
export class BookDetailModule {}
