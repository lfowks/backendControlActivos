import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activo } from 'src/Entities/activo.entity';
import { Ubicacion } from 'src/Entities/ubicacion.entity';
import { Repository } from 'typeorm';
import { CreateActivoDTO } from './dto/create-activo.dto';
import { UpdateActivoDTO } from './dto/update-activo.dto';
import { Ley } from 'src/Entities/ley.entity';
import { Donador } from 'src/Entities/donador.entity';

@Injectable()
export class ActivoService {
  constructor(
    @InjectRepository(Ubicacion)
    private ubicacionRepository: Repository<Ubicacion>,
    @InjectRepository(Activo)
    private activoRepository: Repository<Activo>,
    @InjectRepository(Ley)
    private leyRepository : Repository<Ley>,
    @InjectRepository(Donador)
    private donadorRepository : Repository<Donador>
  ) { }


  async createActivo(createActivoDTO: CreateActivoDTO): Promise<Activo> {
    const { leyId, donadorId, ubicacionId } = createActivoDTO;

    // Verificar si la ubicación existe
    const ubicacion = await this.ubicacionRepository.findOne({ where: { id: ubicacionId } });
    if (!ubicacion) {
      throw new NotFoundException('Ubicación no encontrada');
    }

    // Verificar que no se pase leyId y donadorId al mismo tiempo
    if (leyId && donadorId) {
      throw new BadRequestException('No puedes asociar un activo a una ley y un donador al mismo tiempo');
    }

    let ley = null;
    let donador = null;
    let modoAdquisicion = '';

    // Si se proporciona leyId, buscar la Ley
    if (leyId) {
      ley = await this.leyRepository.findOne({ where: { id: leyId } });
      if (!ley) throw new NotFoundException('Ley no encontrada');
      modoAdquisicion = ley.nombre;
    }

    // Si se proporciona donadorId, buscar el Donador
    if (donadorId) {
      donador = await this.donadorRepository.findOne({ where: { id: donadorId } });
      if (!donador) throw new NotFoundException('Donador no encontrado');
      modoAdquisicion = donador.nombre;
    }

    // Crear el nuevo activo
    const newActivo = this.activoRepository.create({
      ...createActivoDTO,
      ubicacion,
      ley,
      donador,
      modoAdquisicion,  // Guardar el nombre de la Ley o Donador
    });

    return await this.activoRepository.save(newActivo);
  }


  async getAllActivos(): Promise<Activo[]> {
    return await this.activoRepository.find({ relations: ['ubicacion', 'ley', 'donador'] });
  }


  async getActivo(id: number): Promise<Activo> {
    const activo = await this.activoRepository.findOne({ where: { id }, relations: ['ubicacion', 'ley', 'donador'] });

    if (!activo) {
      throw new NotFoundException(`Activo con ID ${id} no encontrado`);
    }
    return activo;
  }

  async updateActivo(id: number, updateActivoDTO: UpdateActivoDTO): Promise<Activo> {
    const activo = await this.activoRepository.findOne({ where: { id } });

    if (!activo) {
      throw new NotFoundException(`Activo con ID ${id} no encontrado`);
    }

    const { leyId, donadorId, ubicacionId } = updateActivoDTO;
    let modoAdquisicion = '';

    // Si se actualiza la ubicación
    if (ubicacionId) {
      const ubicacion = await this.ubicacionRepository.findOne({ where: { id: ubicacionId } });
      if (!ubicacion) {
        throw new NotFoundException('Ubicación no encontrada');
      }
      activo.ubicacion = ubicacion;
    }

    // Si se actualiza leyId, buscar la Ley
    if (leyId) {
      const ley = await this.leyRepository.findOne({ where: { id: leyId } });
      if (!ley) throw new NotFoundException('Ley no encontrada');
      activo.ley = ley;
      activo.donador = null;  // Desasociar el Donador si se proporciona Ley
      modoAdquisicion = ley.nombre;
    }

    // Si se actualiza donadorId, buscar el Donador
    if (donadorId) {
      const donador = await this.donadorRepository.findOne({ where: { id: donadorId } });
      if (!donador) throw new NotFoundException('Donador no encontrado');
      activo.donador = donador;
      activo.ley = null;  // Desasociar la Ley si se proporciona Donador
      modoAdquisicion = donador.nombre;
    }

    // Actualizar el campo modoAdquisicion
    activo.modoAdquisicion = modoAdquisicion;

    // Actualizar los demás campos
    Object.assign(activo, updateActivoDTO);

    return await this.activoRepository.save(activo);
  }

  async deleteActivo(id: number): Promise<void> {
    const result = await this.activoRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Activo con ID ${id} no encontrado`);
    }
  }

}
