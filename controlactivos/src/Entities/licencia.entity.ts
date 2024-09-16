import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Donador } from "./donador.entity";
import { Ley } from "./ley.entity";

@Entity()
export class Licencia {
    @PrimaryGeneratedColumn()
    id : number
    
    @Column()
    nombre : string

    @Column()
    descripcion : string

    @Column()
    codigoLicencia : string

    @Column({ nullable: true })
    modoAdquisicion: string;

    @ManyToOne(() => Ley, { nullable: true })
    ley: Ley;

    @ManyToOne(() => Donador, { nullable: true })
    donador: Donador;

}