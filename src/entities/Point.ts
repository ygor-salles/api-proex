import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Map } from "./Map";

@Entity('points')
class Point {
    @PrimaryColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    description: string;
    
    @Column('decimal')
    floor: number;

    @Column('decimal')
    altitude: number;

    @Column('decimal')
    latitude: number;

    @Column('decimal')
    longitude: number;

    @Column()
    isOsbstacle: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    map_id: string

    @ManyToOne(() => Map, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'map_id' })
    map: Map

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { Point };