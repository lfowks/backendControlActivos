export class CreateActivoDTO {
    nombre: string;
    descripcion: string;
    marca: string;
    serie: string;
    estado: string;
    modelo: string;
    numPlaca: number;
    foto: string;
    precio: number;
    observacion: string;
    ubicacionId: number;
    modoAdquisicion: string; // "Ley" o "Donación"
    leyId?: number; // Campo opcional para ley si el modo de adquisición es "Ley"
}
