/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

export enum EnumRoleUser {
  SUPER = 'SUPER',
  NORMAL = 'NORMAL',
  EMPLOYEE = 'EMPLOYEE'
}

@Entity('users')
class User {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: EnumRoleUser, default: EnumRoleUser.NORMAL })
  role: EnumRoleUser;

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User }