import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Licencia } from 'src/Entities/licencia.entity';
import { Repository } from 'typeorm';
import { UpdateLicenciaDTO } from './dto/update-licencia.dto';
import { CreateLicenciaDTO } from './dto/create-licencia.dto';

@Injectable()
export class LicenciaService {
    constructor(@InjectRepository(Licencia) private licenciaRepository : Repository<Licencia>) {}

    async createLicencia(createLicenciaDTO: CreateLicenciaDTO): Promise<Licencia> {
        try {
          const nuevaLicencia = this.licenciaRepository.create(createLicenciaDTO);
          return await this.licenciaRepository.save(nuevaLicencia);
        } catch (error) {
          throw new BadRequestException('No se pudo crear la licencia');
        }
      }
    
      // 2. Obtener todas las licencias
      async getAllLicencias(): Promise<Licencia[]> {
        return await this.licenciaRepository.find();
      }
    
      // 3. Obtener una licencia por ID
      async getLicenciaById(id: number): Promise<Licencia> {
        const licencia = await this.licenciaRepository.findOne({ where: { id } });
    
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
    
        Object.assign(licencia, updateLicenciaDTO); // Actualizamos los campos con el DTO
    
        return await this.licenciaRepository.save(licencia); // Guardamos los cambios
      }
    
      // 5. Eliminar una licencia por ID
      async deleteLicencia(id: number): Promise<void> {
        const result = await this.licenciaRepository.delete(id);
    
        if (result.affected === 0) {
          throw new NotFoundException(`Licencia con ID ${id} no encontrada`);
        }
      }

}
