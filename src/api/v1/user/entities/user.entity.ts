import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

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

  @Column({ type: 'bit', name: 'flg_elm' })
  flgElm: boolean;
}
