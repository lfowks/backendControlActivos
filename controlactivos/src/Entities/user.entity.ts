import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail } from 'class-validator';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id : number;
    
    @Column()
    nombre : string;

    @Column({nullable: true})
    descripcion? : string;

    @Column()
    apellido_1 : string;

    @Column()
    apellido_2 : string;

    @Column({ unique : true })
    @IsEmail()
    email : string;

    @Column()
    contraseña : string;

}