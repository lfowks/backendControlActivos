import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { ActivoService } from './activo.service';
import { UpdateActivoDTO } from './dto/update-activo.dto';
import { Activo } from 'src/Entities/activo.entity';
import { CreateActivoDTO } from './dto/create-activo.dto';
import * as bwipjs from 'bwip-js';
import { Response } from 'express';

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

    @Get('ubicacion/:ubicacionId')
    async getActivosByUbicacion(@Param('ubicacionId') ubicacionId: number): Promise<Activo[]> {
        return await this.activoService.getActivosByUbicacion(ubicacionId);
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

    // Nuevo endpoint para generar el código de barras
    @Get('barcode/:numPlaca')
    async generateBarcode(@Param('numPlaca') numPlaca: string, @Res() res: Response) {
        try {
            bwipjs.toBuffer({
                bcid: 'code128',       // Formato de código de barras (CODE128)
                text: numPlaca,        // El número de placa del activo
                scale: 3,              // Escala del código de barras
                height: 10,            // Altura del código de barras
                includetext: true,     // Incluir el texto del número de placa debajo del código de barras
                textxalign: 'center',  // Alineación del texto
            }, (err, png) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.setHeader('Content-Type', 'image/png');
                    res.send(png);
                }
            });
        } catch (error) {
            res.status(500).send('Error generando el código de barras');
        }
    }
}
