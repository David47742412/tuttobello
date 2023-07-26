import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { BookDetailEntity } from '../../book-detail/entities/book-detail.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryColumn({
    name: 'usr_id',
    type: 'varchar',
    length: 36,
    primaryKeyConstraintName: 'pk_usr_id',
  })
  usrId: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ name: 'num_doc', length: 11, unique: true })
  numDoc: string;

  @Column({ type: 'varchar', length: 150 })
  password: string;

  @Column({ type: 'float' })
  length: number;

  @Column({ type: 'float' })
  latitude: number;

  @CreateDateColumn({
    type: 'datetime',
    name: 'fch_cre',
    select: false,
    update: false,
  })
  fchCre: string;

  @CreateDateColumn({ type: 'datetime', name: 'fch_mod', select: false })
  fchMod: string;

  @Column({
    type: 'varchar',
    name: 'wks_cre',
    length: 50,
    select: false,
    update: false,
  })
  wksCre: string;

  @Column({ type: 'varchar', name: 'wks_mod', length: 50, select: false })
  wksMod: string;

  @Column({ type: 'varchar', length: 30, select: false })
  ipReq: string;

  @Column({ type: 'boolean', name: 'flg_elm', select: false })
  flgElm: boolean;

  //TODO ignore
  token: string;

  //TODO relations
  @OneToMany(() => BookDetailEntity, (dBook) => dBook.user)
  bookDetail: BookDetailEntity[];
}
