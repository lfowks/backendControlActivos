import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { LicenciaService } from './licencia.service';
import { Licencia } from 'src/Entities/licencia.entity';
import { UpdateLicenciaDTO } from './dto/update-licencia.dto';
import { CreateLicenciaDTO } from './dto/create-licencia.dto';

@Controller('licencia')
export class LicenciaController {
    constructor(private licenciaService: LicenciaService) { }

    @Post()
    async createLicencia(@Body() createLicenciaDTO: CreateLicenciaDTO): Promise<Licencia> {
        return await this.licenciaService.createLicencia(createLicenciaDTO);
    }

    @Get()
    async getAllLicencias(): Promise<Licencia[]> {
        return await this.licenciaService.getAllLicencias();
    }

    @Get(':id')
    async getLicenciaById(@Param('id') id: number): Promise<Licencia> {
        return await this.licenciaService.getLicenciaById(id);
    }

    @Patch(':id')
    async updateLicencia(@Param('id') id: number , @Body() updateLicenciaDTO: UpdateLicenciaDTO): Promise<Licencia> {
        return await this.licenciaService.updateLicencia(id, updateLicenciaDTO);
    }

    @Delete(':id')
    async deleteLicencia(@Param('id') id: number): Promise<void> {
     await this.licenciaService.deleteLicencia(id);
    }
}
