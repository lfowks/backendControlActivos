import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Proveedor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombreProveedor: string;

    @Column()
    nombreEmpresa: string;

    @Column()
    telefonoProveedor: number;
    
    @Column()
    telefonoEmpresa: number;

    @Column()
    email: string;




}