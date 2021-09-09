/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Point } from "./Point";
import { Building } from "./Building";


@Entity('maps')
class Map {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column()
  name: string;

  @Column()
  source: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  building_id: string

  @ManyToOne(() => Building, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'building_id' })
  building: Building

  @OneToMany(() => Point, points => points.map, { eager: true })
  points: Point

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Map };