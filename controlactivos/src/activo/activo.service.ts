import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activo } from 'src/Entities/activo.entity';
import { Ubicacion } from 'src/Entities/ubicacion.entity';
import { Repository } from 'typeorm';
import { CreateActivoDTO } from './dto/create-activo.dto';
import { UpdateActivoDTO } from './dto/update-activo.dto';

@Injectable()
export class ActivoService {
  constructor(
    @InjectRepository(Ubicacion)
    private ubicacionRepository: Repository<Ubicacion>,
    @InjectRepository(Activo)
    private activoRepository: Repository<Activo>
  ) { }


  async createActivo(createActivoDTO: CreateActivoDTO): Promise<Activo> {
    const ubicacion = await this.ubicacionRepository.findOne({ where: { id: createActivoDTO.ubicacionId } });

    if (!ubicacion) {
      throw new NotFoundException('Ubicación no encontrada');
    }

    const newActivo = this.activoRepository.create({
      ...createActivoDTO,
      ubicacion,
    });

    return await this.activoRepository.save(newActivo);
  }


  async getAllActivos(): Promise<Activo[]> {
    return await this.activoRepository.find({ relations: ['ubicacion'] });
  }


  async getActivo(id: number): Promise<Activo> {
    const activo = await this.activoRepository.findOne({ where: { id }, relations: ['ubicacion'] });

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
