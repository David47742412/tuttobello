import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BookDetailService } from './book-detail.service';
import { CreateBookDetailDto } from './dto/create-book-detail.dto';
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
    @Body() model: CreateBookDetailDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { userId } = req.user as any;
    getIpAndWks(model, req);
    this.bookDetailService.update(id, model, userId).subscribe((e) => {
      res.send(e);
    });
  }

  @Delete(':id')
  remove(@Req() req: Request, @Param('id') id: string) {
    const model = new CreateBookDetailDto();
    const { userId } = req.user as any;
    getIpAndWks(model, req);
    return this.bookDetailService.remove(id, model, userId);
  }
}
