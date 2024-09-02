export class CreateUserDTO {
    id: number;
    nombre: string;
    apellido_1: string;
    apellido_2: string;
    email: string;
    contraseña: string;
    rol: string;
    descripcion? : string;
}