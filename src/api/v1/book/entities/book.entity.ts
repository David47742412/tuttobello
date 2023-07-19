import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookDetailEntity } from '../../book-detail/entities/book-detail.entity';

@Entity({ name: 'book' })
export class BookEntity {
  @PrimaryColumn({
    type: 'varchar',
    length: 36,
    primaryKeyConstraintName: 'pk_book_id',
  })
  bookId: string;

  @Column({ type: 'nvarchar', length: 200 })
  name: string;

  @Column({ type: 'nvarchar', length: 500 })
  description: string;

  @CreateDateColumn({ type: 'datetime', name: 'fch_cre', nullable: true })
  fchCre: string;

  @UpdateDateColumn({ type: 'datetime', name: 'fch_mod', nullable: true })
  fchMod: string;

  @Column({ type: 'varchar', name: 'wks_cre', length: 50 })
  wksCre: string;

  @Column({ type: 'varchar', name: 'wks_mod', length: 50 })
  wksMod: string;

  @Column({ type: 'varchar', length: 15 })
  ipReq: string;

  @Column({ type: 'boolean', name: 'flg_elm', default: false })
  flgElm: boolean;

  //TODO relations
  @OneToMany(() => BookDetailEntity, (bDetail) => bDetail.book)
  bookDetail: BookDetailEntity[];
}
