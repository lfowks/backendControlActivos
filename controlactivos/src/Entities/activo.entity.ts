import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ubicacion } from "./ubicacion.entity";
import { Ley } from "./ley.entity";
import { Donador } from "./donador.entity";

@Entity()
export class Activo{
    @PrimaryGeneratedColumn()
    id : number;
    
    @Column()
    nombre : string;
    
    @Column()
    descripcion : string;
    
    @Column()
    marca : string;
    
    @Column()
    serie : string;
    
    @Column()
    estado : string;
    
    @Column()
    modelo : string;

    @Column()
    numPlaca : number;

    @Column()
    foto : string;

    @Column()
    precio : number;

    @Column()
    observacion : string;

    @Column({ nullable: true })
    modoAdquisicion: string;

    @ManyToOne(() => Ubicacion, ubicacion => ubicacion.activos)
    ubicacion: Ubicacion;

    @ManyToOne(() => Ley, { nullable: true })
    ley: Ley;

    @ManyToOne(() => Donador, { nullable: true })
    donador: Donador;



}