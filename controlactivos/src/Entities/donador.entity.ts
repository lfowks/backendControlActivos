import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Donador {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    nombre : string;

    @Column()
    descripcion : string;

    @Column()
    fecha : Date;
}