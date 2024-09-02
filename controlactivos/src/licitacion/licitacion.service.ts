import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateLicitacionDTO } from 'src/licitacion/dto/update-licitacion.dto';
import { Licitacion } from 'src/Entities/licitacion.entity';
import { Repository } from 'typeorm';
import { CreateLicitacionDTO } from './dto/create-licitacion.dto';

@Injectable()
export class LicitacionService {
    constructor(@InjectRepository(Licitacion) private licitacionRepository: Repository<Licitacion>) { }

    async createLicitacion(createLicitacionDTO: CreateLicitacionDTO) {
        try {
            const newLicitacion = await this.licitacionRepository.create(createLicitacionDTO);
            return await this.licitacionRepository.save(newLicitacion);
        }
        catch (error) {
            throw new BadRequestException('Error, no se pudo crear la Licitacion');
        }
    }

    async getAllLicitacion() {
        try {
            return await this.licitacionRepository.find();
        } catch (error) {
            throw new NotFoundException('No se encontraron los datos');
        }
    }

    async getLicitacion(id: number) {
        const licitacion = await this.licitacionRepository.findOne({ where: { id } });
        if (!licitacion) {
            throw new NotFoundException('No se encontro la licitacion');
        }
        return licitacion;
    }

    async updateLicitacion(id: number, updateLicitacionDTO: UpdateLicitacionDTO) {
        const licitacion = await this.licitacionRepository.findOne({ where: { id } });
        if (!licitacion) {
            throw new NotFoundException('No se encontro la licitacion');
        } try {
            await this.licitacionRepository.update({ id }, updateLicitacionDTO);
            return await this.licitacionRepository.findOne({ where: { id } });
        } catch (error) {
            throw new BadRequestException('Error al actualizar la licitacion');
        }
    }

    async deleteLicitacion(id: number) {
        const licitacion = await this.licitacionRepository.findOne({ where: { id } });
        if (!licitacion) {
            throw new NotFoundException('No se encontro la licitacion');
        } try {
            await this.licitacionRepository.delete(id);
        } catch (error) {
            throw new BadRequestException('Error al eliminar la licitacion');
        }
    }

}
