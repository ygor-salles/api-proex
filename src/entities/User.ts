/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { hashSync } from 'bcryptjs';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

export enum EnumRoleUser {
  SUPER = 'SUPER',
  NORMAL = 'NORMAL',
  EMPLOYEE = 'EMPLOYEE',
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
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  hashPasswordCreate() {
    this.password = hashSync(this.password, 8);
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
