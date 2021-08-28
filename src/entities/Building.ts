import { Column, CreateDateColumn, Entity, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Map } from "./Map";

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

    @OneToOne(() => Map, map => map.building, { eager: true })
    map: Map

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { Building }