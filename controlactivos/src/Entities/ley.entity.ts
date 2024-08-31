import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Ley{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    numLey : string;

    @Column()
    nombre : string;

    @Column()
    detalle : string;
}