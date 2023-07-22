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

  findAll() {
    return this._model.find();
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this._model.update(id, updateCategoryDto);
  }

  remove(id: string, deteleCategory: UpdateCategoryDto) {
    return this._model.delete(id, deteleCategory);
  }
}
