import { Test, TestingModule } from '@nestjs/testing';
import { BookDetailController } from './book-detail.controller';
import { BookDetailService } from './book-detail.service';

describe('BookDetailController', () => {
  let controller: BookDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookDetailController],
      providers: [BookDetailService],
    }).compile();

    controller = module.get<BookDetailController>(BookDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
