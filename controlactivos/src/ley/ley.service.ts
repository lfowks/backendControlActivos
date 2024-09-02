import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ley } from 'src/Entities/ley.entity';
import { Repository } from 'typeorm';
import { CreateLeyDTO } from './dto/create-ley.dto';
import { UpdateLeyDTO } from './dto/update-ley.dto';

@Injectable()
export class LeyService {
    constructor(@InjectRepository(Ley) private leyRepository: Repository<Ley>) { }

    async createLey(createLeyDTO: CreateLeyDTO) {
        try {
            const newLey = await this.leyRepository.create(createLeyDTO);
            return await this.leyRepository.save(newLey)
        } catch (error) {
            throw new BadRequestException('Error al crear una Ley');
        }
    }

    async getAllLey() {
        try {
            return await this.leyRepository.find();
        } catch (error) {
            throw new NotFoundException('No se encontraron los datos');
        }
    }

    async getLey(id: number) {
        const ley = await this.leyRepository.findOne({ where: { id } });
        if (!ley) {
            throw new NotFoundException('No se encontró la Ley');
        }
        return ley;
    }

    async updateLey(id: number, updateLeyDTO: UpdateLeyDTO) {
        const ley = await this.leyRepository.findOne({ where: { id } });
        if (!ley) {
            throw new NotFoundException('No se encontró la Ley');
        } try {
            await this.leyRepository.update({ id }, updateLeyDTO);
            return await this.leyRepository.findOne({ where: { id } });
        } catch (error) {
            throw new BadRequestException('Error al actualizar la ley');
        }
    }

    async deleteLey(id: number) {
        const ley = await this.leyRepository.findOne({ where: { id } });
        if (!ley) {
            throw new NotFoundException('No se encontró la Ley');
        } try {
            await this.leyRepository.delete(id);
        } catch (error) {
            throw new BadRequestException('Error al eliminar Ley');
        }
    }
    
}
