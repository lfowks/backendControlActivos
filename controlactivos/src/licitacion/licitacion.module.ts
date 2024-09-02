import { Module } from '@nestjs/common';
import { LicitacionService } from './licitacion.service';
import { LicitacionController } from './licitacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Licitacion } from 'src/Entities/licitacion.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Licitacion])],
    providers: [LicitacionService],
    controllers: [LicitacionController]
})
export class LicitacionModule { }
