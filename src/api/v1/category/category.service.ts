import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryModel } from './model/category.model';

@Injectable()
export class CategoryService {
  constructor(private readonly _model: CategoryModel) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this._model.insert(createCategoryDto);
  }

  async findAll() {
    return this._model.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
