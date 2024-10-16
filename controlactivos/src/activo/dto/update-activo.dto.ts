export class UpdateActivoDTO {
    nombre?: string;
    descripcion?: string;
    marca?: string;
    serie?: string;
    estado?: string;
    modelo?: string;
    numPlaca?: string;
    foto?: string;
    precio?: number;
    observacion?: string;
    ubicacionId?: number;
    modoAdquisicion?: string; // "Ley" o "Donación"
    licitacionId: number;// Campo opcional para ley
}
