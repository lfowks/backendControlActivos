import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Activo } from './activo.entity';
import { User } from './user.entity';
import { Ubicacion } from './ubicacion.entity';

@Entity()
export class Prestamo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Activo)
  activo: Activo;

  @ManyToOne(() => User)
  prestadoPor: User;

  @ManyToOne(() => User)
  prestadoA: User;

  @ManyToOne(() => Ubicacion)
  ubicacion: Ubicacion;  // Ubicación nueva (donde se prestó el activo)

  @ManyToOne(() => Ubicacion)  // Nueva relación para la ubicación actual
  ubicacionActual: Ubicacion;  // Ubicación actual del activo (de dónde se prestó)

  @Column()
  fechaPrestamo: Date;

  @Column({ nullable: true })  // Permitimos que la fecha de devolución sea opcional al crear el préstamo
  fechaDevolucion: Date;

  @Column({ default: 'En préstamo' })
  estado: string;  // Podría ser un enum, pero lo dejamos como string por simplicidad
}