import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ubicacion } from "./ubicacion.entity";
import { User } from "./user.entity";
import { Activo } from "./activo.entity";

@Entity()
export class Prestamo {
  @PrimaryGeneratedColumn()
  prestamo_id: number;

  @ManyToOne(() => User, (user) => user.prestamos)
  user: User;

  @ManyToOne(() => Activo, (activo) => activo.prestamos)
  activo: Activo;

  @ManyToOne(() => Ubicacion)
  ubicacion_origen: Ubicacion;

  @ManyToOne(() => Ubicacion)
  ubicacion_destino: Ubicacion;

  @Column({ type: 'date' })
  fecha_solicitud: Date;

  @Column({ type: 'date', nullable: true })
  fecha_aprobacion: Date;

  @Column({ default: 'pendiente' })
  estado: string;
}