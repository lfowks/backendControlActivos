import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activo } from 'src/Entities/activo.entity';
import { Ubicacion } from 'src/Entities/ubicacion.entity';
import { Repository } from 'typeorm';
import { CreateActivoDTO } from './dto/create-activo.dto';
import { UpdateActivoDTO } from './dto/update-activo.dto';
import { Ley } from 'src/Entities/ley.entity'; // Importamos la entidad Ley

@Injectable()
export class ActivoService {
  constructor(
    @InjectRepository(Ubicacion)
    private ubicacionRepository: Repository<Ubicacion>,
    @InjectRepository(Activo)
    private activoRepository: Repository<Activo>,
    @InjectRepository(Ley)
    private leyRepository: Repository<Ley> // Repositorio de Ley
  ) {}

  // Crear activo con posibilidad de adquisición por ley
  async createActivo(createActivoDTO: CreateActivoDTO): Promise<Activo> {
    const { ubicacionId, modoAdquisicion, leyId } = createActivoDTO;

    const ubicacion = await this.ubicacionRepository.findOne({ where: { id: ubicacionId } });

    if (!ubicacion) {
      throw new NotFoundException('Ubicación no encontrada');
    }

    let ley = null;
    if (modoAdquisicion === 'Ley' && leyId) {
      ley = await this.leyRepository.findOne({ where: { id: leyId } });
      if (!ley) {
        throw new NotFoundException('Ley no encontrada');
      }
    }

    const newActivo = this.activoRepository.create({
      ...createActivoDTO,
      ubicacion,
      ley, // Solo si el modo es "Ley"
    });

    return await this.activoRepository.save(newActivo);
  }

  async getAllActivos(): Promise<Activo[]> {
    return await this.activoRepository.find({ relations: ['ubicacion', 'ley'] });
  }

  async getActivo(id: number): Promise<Activo> {
    const activo = await this.activoRepository.findOne({ where: { id }, relations: ['ubicacion', 'ley'] });

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

    if (updateActivoDTO.ubicacionId) {
      const ubicacion = await this.ubicacionRepository.findOne({ where: { id: updateActivoDTO.ubicacionId } });

      if (!ubicacion) {
        throw new NotFoundException('Ubicación no encontrada');
      }
      activo.ubicacion = ubicacion;
    }

    if (updateActivoDTO.modoAdquisicion === 'Ley' && updateActivoDTO.leyId) {
      const ley = await this.leyRepository.findOne({ where: { id: updateActivoDTO.leyId } });

      if (!ley) {
        throw new NotFoundException('Ley no encontrada');
      }
      activo.ley = ley;
    }

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
