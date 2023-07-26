import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
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

  @CreateDateColumn({
    type: 'datetime',
    name: 'fch_cre',
    nullable: true,
    select: false,
  })
  fchCre?: string;

  @CreateDateColumn({
    type: 'datetime',
    name: 'fch_mod',
    nullable: true,
    select: false,
    update: false,
  })
  @UpdateDateColumn({
    type: 'datetime',
    name: 'fch_mod',
    nullable: true,
    select: false,
  })
  fchMod?: string;

  @Column({
    type: 'varchar',
    name: 'wks_cre',
    length: 50,
    select: false,
    update: false,
  })
  wksCre?: string;

  @Column({ type: 'varchar', name: 'wks_mod', length: 50, select: false })
  wksMod?: string;

  @Column({ type: 'varchar', length: 30, select: false })
  ipReq?: string;

  @Column({ type: 'boolean', name: 'flg_elm', default: false, select: false })
  flgElm?: boolean;

  //TODO relations
  @OneToMany(() => BookDetailEntity, (dBook) => dBook.category)
  bookDetail?: BookDetailEntity[];
}
