import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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

}