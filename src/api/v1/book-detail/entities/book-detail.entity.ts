import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookEntity } from '../../book/entities/book.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { CategoryEntity } from '../../category/entities/category.entity';

@Entity({ name: 'book_detail' })
export class BookDetailEntity {
  //TODO require for orm
  @PrimaryGeneratedColumn({ name: 'book_detail_id' })
  bookDetailId: number;

  @ManyToOne(() => BookEntity, (book) => book.bookDetail)
  @JoinColumn({
    name: 'book_id',
    foreignKeyConstraintName: 'fk_book_detail_book_id',
  })
  book: BookEntity;

  @ManyToOne(() => UserEntity, (user) => user.bookDetail)
  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'fk_book_detail_user_id',
  })
  user: UserEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.bookDetail)
  @JoinColumn({
    name: 'category_id',
    foreignKeyConstraintName: 'fk_book_detail_category_id',
  })
  category: CategoryEntity;

  @Column({ type: 'boolean' })
  flgElm: boolean;
}
