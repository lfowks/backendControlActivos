import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
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