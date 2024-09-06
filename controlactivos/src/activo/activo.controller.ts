import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ActivoService } from './activo.service';
import { UpdateActivoDTO } from './dto/update-activo.dto';
import { Activo } from 'src/Entities/activo.entity';
import { CreateActivoDTO } from './dto/create-activo.dto';

@Controller('activo')
export class ActivoController {
    constructor(private activoService: ActivoService) { }

    @Post()
    async createActivo(@Body() createActivoDTO: CreateActivoDTO): Promise<Activo> {
        return await this.activoService.createActivo(createActivoDTO);
    }

    @Get()
    async getAllActivos(): Promise<Activo[]> {
        return await this.activoService.getAllActivos();
    }

    @Get(':id')
    async getActivo(@Param('id') id: number): Promise<Activo> {
        return await this.activoService.getActivo(id);
    }

    @Patch(':id')
    async updateActivo(
        @Param('id') id: number, @Body() updateActivoDTO: UpdateActivoDTO): Promise<Activo> {
        return await this.activoService.updateActivo(id, updateActivoDTO);
    }

    @Delete(':id')
    async deleteActivo(@Param('id') id: number): Promise<void> {
        return await this.activoService.deleteActivo(id);
    }

}
