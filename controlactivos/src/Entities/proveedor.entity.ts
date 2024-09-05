import { IsEmail } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Licitacion } from "./licitacion.entity";
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

    @Column({unique : true})
    @IsEmail()
    email: string;
    

    @OneToMany(() => Licitacion, licitacion => licitacion.proveedor)
    licitaciones : Licitacion

}