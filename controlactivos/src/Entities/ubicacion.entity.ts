import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Activo } from "./activo.entity";
@Entity()
export class Ubicacion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre : string;
    
    @Column()
    descripcion : string;

    @Column()
    pabellon : string;

    @OneToMany(() => Activo, activo => activo.ubicacion)
    activos: Activo;
}