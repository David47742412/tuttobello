import { Module } from '@nestjs/common';
import { BookDetailService } from './book-detail.service';
import { BookDetailController } from './book-detail.controller';

@Module({
  controllers: [BookDetailController],
  providers: [BookDetailService]
})
export class BookDetailModule {}
