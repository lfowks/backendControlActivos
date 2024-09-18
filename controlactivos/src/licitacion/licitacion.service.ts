import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateLicitacionDTO } from 'src/licitacion/dto/update-licitacion.dto';
import { Licitacion } from 'src/Entities/licitacion.entity';
import { Repository } from 'typeorm';
import { CreateLicitacionDTO } from './dto/create-licitacion.dto';
import { Proveedor } from 'src/Entities/proveedor.entity';
import { Ley } from 'src/Entities/ley.entity';  // Importar la entidad Ley

@Injectable()
export class LicitacionService {
    constructor(
        @InjectRepository(Licitacion)
        private licitacionRepository: Repository<Licitacion>,
        @InjectRepository(Proveedor)
        private proveedorRepository: Repository<Proveedor>,
        @InjectRepository(Ley)  // Inyectar el repositorio de Ley
        private leyRepository: Repository<Ley>,
    ) {}

    // Crear Licitación
    async createLicitacion(createLicitacionDTO: CreateLicitacionDTO) {
        try {
            // Verificar el Proveedor
            const proveedor = await this.proveedorRepository.findOne({ where: { id: createLicitacionDTO.idProveedor } });
            if (!proveedor) {
                throw new NotFoundException('No se encontró al Proveedor');
            }

            // Verificar la Ley
            const ley = await this.leyRepository.findOne({ where: { id: createLicitacionDTO.idLey } });
            if (!ley) {
                throw new NotFoundException('No se encontró la Ley');
            }

            // Crear la nueva licitación
            const newLicitacion = this.licitacionRepository.create({
                ...createLicitacionDTO,
                proveedor,
                ley,  // Asignar la ley a la licitación
            });

            return await this.licitacionRepository.save(newLicitacion);
        } catch (error) {
            throw new BadRequestException('Error, no se pudo crear la licitación');
        }
    }

    // Obtener todas las licitaciones
    async getAllLicitacion() {
        try {
            return await this.licitacionRepository.find({
                relations: ['proveedor', 'ley'],  // Incluir proveedor y ley en la consulta
            });
        } catch (error) {
            throw new NotFoundException('No se encontraron los datos');
        }
    }

    // Obtener una licitación por ID
    async getLicitacion(id: number) {
        const licitacion = await this.licitacionRepository.findOne({
            where: { id },
            relations: ['proveedor', 'ley'],  // Incluir proveedor y ley en la consulta
        });
        if (!licitacion) {
            throw new NotFoundException('No se encontró la licitación');
        }
        return licitacion;
    }

    // Actualizar Licitación
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

            if (updateLicitacionDTO.idLey) {
                const ley = await this.leyRepository.findOne({
                    where: { id: updateLicitacionDTO.idLey },
                });
                if (!ley) {
                    throw new NotFoundException('Ley no encontrada');
                }
                licitacion.ley = ley;
            }

            Object.assign(licitacion, updateLicitacionDTO);
            return await this.licitacionRepository.save(licitacion);
        } catch (error) {
            throw new BadRequestException('Error al actualizar la licitación');
        }
    }

    // Eliminar Licitación
    async deleteLicitacion(id: number) {
        const licitacion = await this.licitacionRepository.findOne({ where: { id } });
        if (!licitacion) {
            throw new NotFoundException('No se encontró la licitación');
        }
        try {
            await this.licitacionRepository.delete(id);
        } catch (error) {
            throw new BadRequestException('Error al eliminar la licitación');
        }
    }
}
