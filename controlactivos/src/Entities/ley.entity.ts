import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Licitacion } from "./licitacion.entity";
@Entity()
export class Ley{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    numLey : string;

    @Column()
    nombre : string;

    @Column()
    detalle : string;

    @OneToMany(() => Licitacion, licitacion => licitacion.ley)
    licitaciones: Licitacion[];
}