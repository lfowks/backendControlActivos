import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Proveedor } from "./proveedor.entity";
@Entity()
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
    
    
    @ManyToOne(() => Proveedor , proveedor => proveedor.licitaciones)
    proveedor: Proveedor;
}