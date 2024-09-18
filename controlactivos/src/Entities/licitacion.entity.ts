import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Proveedor } from "./proveedor.entity";
import { Ley } from "./ley.entity";
@Entity()
export class Licitacion {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    numActa : number;

    @Column()
    numLicitacion : number;

    @Column()
    nombre : string;

    @Column()
    monto : number;

    @Column()
    descripcion : string

    @Column()
    fecha : Date;
    
    
    @ManyToOne(() => Proveedor , proveedor => proveedor.licitaciones)
    proveedor: Proveedor;

    @ManyToOne(() => Ley)
    ley: Ley; 
}