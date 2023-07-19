import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './database/TypeOrmConfig';
import { UserModule } from './api/v1/user/user.module';
import { BookModule } from './api/v1/book/book.module';
import { AuthModule } from './api/v1/auth/auth.module';
import { BookDetailModule } from './api/v1/book-detail/book-detail.module';
import { CategoryModule } from './api/v1/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
      ignoreEnvFile: false,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
    }),
    UserModule,
    BookModule,
    AuthModule,
    BookDetailModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
