import { Module } from '@nestjs/common';
import { ActivoService } from './activo.service';
import { ActivoController } from './activo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activo } from 'src/Entities/activo.entity';
import { Ubicacion } from 'src/Entities/ubicacion.entity';
import { Ley } from 'src/Entities/ley.entity'; // Importamos la entidad Ley

@Module({
  imports: [TypeOrmModule.forFeature([Activo, Ubicacion, Ley])], // Incluimos Ley en los repositorios
  providers: [ActivoService],
  controllers: [ActivoController],
  exports: [ActivoService]
})
export class ActivoModule {}
