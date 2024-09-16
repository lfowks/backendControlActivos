import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Licencia } from 'src/Entities/licencia.entity';
import { Repository } from 'typeorm';
import { UpdateLicenciaDTO } from './dto/update-licencia.dto';
import { CreateLicenciaDTO } from './dto/create-licencia.dto';
import { Donador } from 'src/Entities/donador.entity';
import { Ley } from 'src/Entities/ley.entity';

@Injectable()
export class LicenciaService {
  constructor(@InjectRepository(Licencia)
  private licenciaRepository: Repository<Licencia>,
    @InjectRepository(Ley)
    private leyRepository: Repository<Ley>,
    @InjectRepository(Donador)
    private donadorRepository: Repository<Donador>
  ) { }

  async createLicencia(createLicenciaDTO: CreateLicenciaDTO): Promise<Licencia> {
    const { leyId, donadorId, ...licenciaData } = createLicenciaDTO;

    if (leyId && donadorId) {
      throw new BadRequestException('Una licencia no puede tener ambas, ley y donador.');
    }

    const licencia = this.licenciaRepository.create(licenciaData);

    if (leyId) {
      const ley = await this.leyRepository.findOne({ where: { id: leyId } });
      if (!ley) {
        throw new BadRequestException('Ley no encontrada');
      }
      licencia.ley = ley;
      licencia.modoAdquisicion = 'Ley';
    }

    if (donadorId) {
      const donador = await this.donadorRepository.findOne({ where: { id: donadorId } });
      if (!donador) {
        throw new BadRequestException('Donador no encontrado');
      }
      licencia.donador = donador;
      licencia.modoAdquisicion = 'Donador';
    }

    return await this.licenciaRepository.save(licencia);
  }

  async getAllLicencias(): Promise<Licencia[]> {
    return await this.licenciaRepository.find({
      relations: ['ley', 'donador'],
    });
  }

  // 3. Obtener una licencia por ID
  async getLicenciaById(id: number): Promise<Licencia> {
    const licencia = await this.licenciaRepository.findOne({
      where: { id },
      relations: ['ley', 'donador'],
    });

    if (!licencia) {
      throw new NotFoundException(`Licencia con ID ${id} no encontrada`);
    }

    return licencia;
  }

  // 4. Actualizar una licencia por ID
  async updateLicencia(id: number, updateLicenciaDTO: UpdateLicenciaDTO): Promise<Licencia> {
    const licencia = await this.licenciaRepository.findOne({ where: { id } });

    if (!licencia) {
      throw new NotFoundException(`Licencia con ID ${id} no encontrada`);
    }

    const { leyId, donadorId, ...licenciaData } = updateLicenciaDTO;

    // Verificar que no se proporcionen ambos, ley y donador
    if (leyId && donadorId) {
      throw new BadRequestException('Una licencia no puede tener ambas, ley y donador.');
    }

    // Actualizamos los campos generales
    Object.assign(licencia, licenciaData);

    // Determinar si se actualiza ley o donador
    if (leyId) {
      const ley = await this.leyRepository.findOne({ where: { id: leyId } });
      if (!ley) {
        throw new BadRequestException('Ley no encontrada');
      }
      licencia.ley = ley;
      licencia.modoAdquisicion = 'Ley';
      licencia.donador = null; // Limpiar donador si se asigna una ley
    }

    if (donadorId) {
      const donador = await this.donadorRepository.findOne({ where: { id: donadorId } });
      if (!donador) {
        throw new BadRequestException('Donador no encontrado');
      }
      licencia.donador = donador;
      licencia.modoAdquisicion = 'Donador';
      licencia.ley = null; // Limpiar ley si se asigna un donador
    }

    return await this.licenciaRepository.save(licencia);
  }

  async deleteLicencia(id: number): Promise<void> {
    const result = await this.licenciaRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Licencia con ID ${id} no encontrada`);
    }
  }

}
