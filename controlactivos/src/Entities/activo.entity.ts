import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ubicacion } from "./ubicacion.entity";
import { Ley } from "./ley.entity"; // Importamos la entidad Ley
import { Prestamo } from "./prestamo.entity";

@Entity()
export class Activo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column()
    marca: string;

    @Column()
    serie: string;

    @Column()
    estado: string;

    @Column()
    modelo: string;

    @Column()
    numPlaca: number;

    @Column()
    foto: string;

    @Column({ nullable: true })
    precio: number;

    @Column({ nullable: true })
    observacion: string;

    @Column()
    modoAdquisicion: string; // Columna para especificar si es "Ley" o "Donación"

    @ManyToOne(() => Ubicacion, ubicacion => ubicacion.activos)
    ubicacion: Ubicacion;

    @ManyToOne(() => Ley, { nullable: true }) // Relación opcional con Ley
    ley?: Ley;

    @OneToMany(() => Prestamo, (prestamo) => prestamo.activo)
    prestamos: Prestamo[];
}
