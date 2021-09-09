/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Map } from "./Map";
import { Organization } from "./Organization";

@Entity('buildings')
class Building {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column()
  name: string;

  @Column('decimal')
  latitude: number;

  @Column('decimal')
  longitude: number;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Column()
  organization_id: string;

  @ManyToOne(() => Organization, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organization_id' })
  organization: Organization

  @OneToMany(() => Map, map => map.building, { eager: true })
  map: Map

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Building }