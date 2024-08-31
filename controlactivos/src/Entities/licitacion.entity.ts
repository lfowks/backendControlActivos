import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Licitacion {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    numActa : number;

    @Column()
    numLicitacion : number;

    @Column()
    Nombre : string;

    @Column()
    Monto : number;

    @Column()
    descripcion : string

    @Column()
    fecha : Date;

}