import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Map } from './Map';

@Entity('points')
class Point {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  floor: number;

  @Column()
  altitude: number;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  isObstacle: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  map_id: string;

  @ManyToOne(() => Map, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'map_id' })
  map: Map;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Point };
