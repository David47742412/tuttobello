import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { BookDetailService } from './book-detail.service';
import { CreateBookDetailDto } from './dto/create-book-detail.dto';
import { UpdateBookDetailDto } from './dto/update-book-detail.dto';
import { FindBookDetailDto } from './dto/find-book-detail.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { getIpAndWks } from '../../../const/external.function';

@UseGuards(JwtGuard)
@Controller('book-detail')
export class BookDetailController {
  constructor(private readonly bookDetailService: BookDetailService) {}

  @Post()
  create(
    @Req() req: Request,
    @Body() createBookDetailDto: CreateBookDetailDto,
  ) {
    const { userId } = req.user as any;
    getIpAndWks(createBookDetailDto, req);
    return this.bookDetailService.create(createBookDetailDto, userId);
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
