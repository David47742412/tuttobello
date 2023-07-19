import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { BookDetailEntity } from '../../book-detail/entities/book-detail.entity';

@Entity({ name: 'category' })
export class CategoryEntity {
  @PrimaryColumn({
    type: 'varchar',
    length: 36,
    primaryKeyConstraintName: 'pk_category_id',
    name: 'category_id',
  })
  categoryId: string;

  @Column({ type: 'nvarchar', length: 500 })
  description: string;

  @CreateDateColumn({ type: 'datetime', name: 'fch_cre' })
  fchCre: string;

  @CreateDateColumn({ type: 'datetime', name: 'fch_mod' })
  fchMod: string;

  @Column({ type: 'varchar', name: 'wks_cre', length: 50 })
  wksCre: string;

  @Column({ type: 'varchar', name: 'wks_mod', length: 50 })
  wksMod: string;

  @Column({ type: 'varchar', length: 15 })
  ipReq: string;

  @Column({ type: 'boolean', name: 'flg_elm' })
  flgElm: boolean;

  //TODO relations
  @OneToMany(() => BookDetailEntity, (dBook) => dBook.category)
  bookDetail: BookDetailEntity[];
}
