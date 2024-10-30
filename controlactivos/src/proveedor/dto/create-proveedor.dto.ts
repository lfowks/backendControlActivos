import { IsEmail } from "class-validator";

export class CreateProveedorDTO {
    nombreProveedor: string;
    nombreEmpresa: string;
    telefonoProveedor: string;
    disponibilidad?: string;
    telefonoEmpresa: string;

    @IsEmail({}, {message: 'El email ingresado no es válido.'})
    email: string;
}