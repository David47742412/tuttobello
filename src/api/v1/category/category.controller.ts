import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Request } from 'express';
import { getIpAndWks } from '../../../const/external.function';
import { JwtGuard } from '../auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    getIpAndWks(createCategoryDto, req);
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    getIpAndWks(updateCategoryDto, req);
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Req() req: Request, @Param('id') id: string) {
    const deleteCategory = new UpdateCategoryDto();
    getIpAndWks(deleteCategory, req);
    return this.categoryService.remove(id, deleteCategory);
  }
}
