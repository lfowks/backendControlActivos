import { IsEmail } from "class-validator";

export class UpdateProveedorDTO {
    nombreProveedor?: string;
    
    nombreEmpresa?: string;

    telefonoProveedor?: string;

    telefonoEmpresa?: string;

    @IsEmail({}, {message: 'El email ingresado no es válido.'})
    email?: string;
}
