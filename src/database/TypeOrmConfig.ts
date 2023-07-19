import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '../api/v1/user/entities/user.entity';
import { BookEntity } from '../api/v1/book/entities/book.entity';
import { CategoryEntity } from '../api/v1/category/entities/category.entity';
import { BookDetailEntity } from '../api/v1/book-detail/entities/book-detail.entity';

@Injectable()
export class TypeOrmConfig {
  constructor(private readonly config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      port: this.config.get<number>('database.port'),
      host: this.config.get<string>('database.host'),
      username: this.config.get<string>('database.user'),
      password: this.config.get<string>('database.password'),
      database: this.config.get<string>('database.name'),
      synchronize: true,
      logger: 'simple-console',
      entities: [UserEntity, BookEntity, CategoryEntity, BookDetailEntity],
    };
  }
}
