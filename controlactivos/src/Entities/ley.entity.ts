import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Ley{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    numLey : string;

    @Column()
    nombre : string;

    @Column()
    detalle : string;
}