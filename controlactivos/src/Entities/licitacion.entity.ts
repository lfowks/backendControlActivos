import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Proveedor } from "./proveedor.entity";
import { Ley } from "./ley.entity";
import { Activo } from "./activo.entity";  // Relación con Activo

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

    @Column({ default: 'En Servicio' })
    disponibilidad: string;

    @ManyToOne(() => Proveedor , proveedor => proveedor.licitaciones)
    proveedor: Proveedor;

    @ManyToOne(() => Ley)  // Relación con Ley
    ley: Ley; 

    @OneToMany(() => Activo, activo => activo.licitacion) // Relación inversa con Activo
    activos: Activo[];
}
