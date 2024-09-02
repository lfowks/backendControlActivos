import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ubicacion } from 'src/Entities/ubicacion.entity';
import { Repository } from 'typeorm';
import { CreateUbicacionDTO } from './dto/create-ubicacion.dto';
import { UpdateUbicacionDTO } from './dto/update-ubicacion.dto';

@Injectable()
export class UbicacionService {
    constructor(@InjectRepository(Ubicacion) private ubicacionRepository: Repository<Ubicacion>) { }

    async createUbicacion(createUbicacionDTO: CreateUbicacionDTO) {
        try {
            const newUbicacion = await this.ubicacionRepository.create(createUbicacionDTO);
            return await this.ubicacionRepository.save(newUbicacion);
        } catch {
            throw new BadRequestException('Error al crear la ubicación');
        }
    }

    async getAllUbicacion() {
        try {
            return await this.ubicacionRepository.find();
        } catch (error) {
            throw new NotFoundException('No se encontraron las ubicaciones');
        }
    }

    async getUbicacion(id: number) {
        const ubicacion = await this.ubicacionRepository.findOne({ where: { id } });
        if (!ubicacion) {
            throw new NotFoundException('No se encontro la ubicación');
        }
        return ubicacion;
    }

    async updateUbicacion(id: number, updateUbicacionDTO: UpdateUbicacionDTO) {
        const ubicacion = await this.ubicacionRepository.findOne({ where: { id } });
        if (!ubicacion) {
            throw new NotFoundException('No se encontro la ubicación');
        } try {
            await this.ubicacionRepository.update({ id }, updateUbicacionDTO);
            return this.ubicacionRepository.findOne({ where: { id } });
        } catch (error) {
            throw new BadRequestException('Error al actualizar la ubicación');
        }
    }

    async deleteUbicacion(id: number) {
        const ubicacion = this.ubicacionRepository.findOne({ where: { id } });
        if (!ubicacion) {
            throw new NotFoundException('No se encontro la ubicación');
        } try {
            await this.ubicacionRepository.delete(id);
        } catch (error) {
            throw new BadRequestException('Error al eliminar la ubicación');
        }
    }

}
