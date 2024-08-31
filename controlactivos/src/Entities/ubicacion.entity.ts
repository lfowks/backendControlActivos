import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Ubicacion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre : string;
    
    @Column()
    descripcion : string;

    @Column()
    pabellon : string;

}