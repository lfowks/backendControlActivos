import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ubicacion } from "./ubicacion.entity";

@Entity()
export class Activo{
    @PrimaryGeneratedColumn()
    id : number
    
    @Column()
    nombre : string
    
    @Column()
    descripcion : string
    
    @Column()
    marca : string
    
    @Column()
    serie : string
    
    @Column()
    estado : string
    
    @Column()
    modelo : string

    @Column()
    numPlaca : number

    @Column()
    foto : string

    @Column()
    precio : number

    @Column()
    observacion : string

    @ManyToOne(() => Ubicacion, ubicacion => ubicacion.activos)
    ubicacion: Ubicacion;

}