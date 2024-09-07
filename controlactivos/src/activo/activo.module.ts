import { Module } from '@nestjs/common';
import { ActivoService } from './activo.service';
import { ActivoController } from './activo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activo } from 'src/Entities/activo.entity';
import { Ubicacion } from 'src/Entities/ubicacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Activo, Ubicacion])],
  providers: [ActivoService],
  controllers: [ActivoController],
  exports: [ActivoService]
})
export class ActivoModule {}
