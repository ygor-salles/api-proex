import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Building } from './Building';

@Entity('organizations')
class Organization {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column()
  name: string;

  @Column()
  cep: string;

  @Column()
  state: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Building, building => building.organization)
  buildings: Building;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Organization };
