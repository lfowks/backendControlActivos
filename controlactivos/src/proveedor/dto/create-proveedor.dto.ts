import { IsEmail } from "class-validator";

export class CreateProveedorDTO {
    nombreProveedor: string;
    
    nombreEmpresa: string;

    telefonoProveedor: number;

    telefonoEmpresa: number;

    @IsEmail({}, {message: 'El email ingresado no es válido.'})
    email: string;
}