import { Module } from '@nestjs/common';
import { LicenciaService } from './licencia.service';
import { LicenciaController } from './licencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Licencia } from 'src/Entities/licencia.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Licencia])],
  providers: [LicenciaService],
  controllers: [LicenciaController]
})
export class LicenciaModule {}
