import { Module } from '@nestjs/common';
import { LicitacionService } from './licitacion.service';
import { LicitacionController } from './licitacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Licitacion } from 'src/Entities/licitacion.entity';
import { Proveedor } from 'src/Entities/proveedor.entity';
import { ProveedorService } from 'src/proveedor/proveedor.service';
import { Ley } from 'src/Entities/ley.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Licitacion, Proveedor, Ley])],
    providers: [LicitacionService, ProveedorService],
    controllers: [LicitacionController],
    exports: [LicitacionService]
})
export class LicitacionModule { }
