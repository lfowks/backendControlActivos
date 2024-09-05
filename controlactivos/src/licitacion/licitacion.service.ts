import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateLicitacionDTO } from 'src/licitacion/dto/update-licitacion.dto';
import { Licitacion } from 'src/Entities/licitacion.entity';
import { Repository } from 'typeorm';
import { CreateLicitacionDTO } from './dto/create-licitacion.dto';
import { Proveedor } from 'src/Entities/proveedor.entity';

@Injectable()
export class LicitacionService {
    constructor(
        @InjectRepository(Licitacion)
        private licitacionRepository: Repository<Licitacion>,
        @InjectRepository(Proveedor)
        private proveedorRepository: Repository<Proveedor>
    ) { }

    async createLicitacion(createLicitacionDTO: CreateLicitacionDTO) {
        try {

            const proveedor = await this.proveedorRepository.findOne({ where: { id: createLicitacionDTO.idProveedor } })
            if (!proveedor) {
                throw new NotFoundException('No se encontro al Proveedor');
            }

            const newLicitacion = this.licitacionRepository.create({
                ...createLicitacionDTO,
                proveedor,
            });

            return await this.licitacionRepository.save(newLicitacion);
        }
        catch (error) {
            throw new BadRequestException('Error, no se pudo crear la licitación');
        }
    }

    async getAllLicitacion() {
        try {
            return await this.licitacionRepository.find({
                relations: ['proveedor'],
            });
        } catch (error) {
            throw new NotFoundException('No se encontraron los datos');
        }
    }

    async getLicitacion(id: number) {
        const licitacion = await this.licitacionRepository.findOne({
            where: { id },
            relations: ['proveedor'],
        });
        if (!licitacion) {
            throw new NotFoundException('No se encontro la licitación');
        }
        return licitacion;
    }

    async updateLicitacion(id: number, updateLicitacionDTO: UpdateLicitacionDTO) {
        const licitacion = await this.licitacionRepository.findOne({ where: { id } });
        if (!licitacion) {
          throw new NotFoundException('No se encontró la licitación');
        }
    
        try {

          if (updateLicitacionDTO.idProveedor) {
            const proveedor = await this.proveedorRepository.findOne({
              where: { id: updateLicitacionDTO.idProveedor },
            });
    
            if (!proveedor) {
              throw new NotFoundException('Proveedor no encontrado');
            }
    
            licitacion.proveedor = proveedor;
          }
    
          Object.assign(licitacion, updateLicitacionDTO)
    
          return await this.licitacionRepository.save(licitacion);
        } catch (error) {
          throw new BadRequestException('Error al actualizar la licitación');
        }
      }

    async deleteLicitacion(id: number) {
        const licitacion = await this.licitacionRepository.findOne({ where: { id } });
        if (!licitacion) {
            throw new NotFoundException('No se encontro la licitación');
        } try {
            await this.licitacionRepository.delete(id);
        } catch (error) {
            throw new BadRequestException('Error al eliminar la licitación');
        }
    }

}
