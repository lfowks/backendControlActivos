import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}