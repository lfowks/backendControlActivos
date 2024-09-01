import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { LicitacionService } from './licitacion.service';
import { CreateLicitacionDTO } from 'src/dto/create-licitacion.dto';
import { Licitacion } from 'src/Entities/licitacion.entity';
import { UpdateLicitacionDTO } from 'src/dto/update-licitacion.dto';

@Controller('licitacion')
export class LicitacionController {
    constructor(private licitacionService : LicitacionService) {}

    @Post()
    createLicitacion(@Body() createLicitacionDTO : CreateLicitacionDTO): Promise<Licitacion> {
        return this.licitacionService.createLicitacion(createLicitacionDTO);
    }

    @Get()
    getAllLicitacion(): Promise<Licitacion[]>{
        return this.licitacionService.getAllLicitacion()
    }

    @Get(':id')
    getLicitacion(@Param('id') id : number){
        return this.licitacionService.getLicitacion(id);
    }

    @Patch(':id')
    updateLicitacion(@Param('id') id : number, @Body() updateLicitacionDTO : UpdateLicitacionDTO) {
        return this.licitacionService.updateLicitacion(id,updateLicitacionDTO);
    }

    @Delete(':id')
    deleteLicitacion(@Param('id', ParseIntPipe) id: number){
        return this.licitacionService.deleteLicitacion(id);
    }
}
