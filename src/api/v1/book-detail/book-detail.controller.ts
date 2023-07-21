import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BookDetailService } from './book-detail.service';
import { CreateBookDetailDto } from './dto/create-book-detail.dto';
import { UpdateBookDetailDto } from './dto/update-book-detail.dto';
import { FindBookDetailDto } from './dto/find-book-detail.dto';

@Controller('book-detail')
export class BookDetailController {
  constructor(private readonly bookDetailService: BookDetailService) {}

  @Post()
  create(@Body() createBookDetailDto: CreateBookDetailDto) {
    return this.bookDetailService.create(createBookDetailDto);
  }

  @Get()
  findOne(@Query('filter') filter: FindBookDetailDto) {
    return this.bookDetailService.findAll(filter);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookDetailDto: UpdateBookDetailDto,
  ) {
    return this.bookDetailService.update(+id, updateBookDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookDetailService.remove(+id);
  }
}
