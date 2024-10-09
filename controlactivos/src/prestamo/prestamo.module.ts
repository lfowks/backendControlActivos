import { Module } from '@nestjs/common';
import { PrestamoService } from './prestamo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prestamo } from 'src/Entities/prestamo.entity';
import { PrestamoController } from './prestamo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Prestamo])],
  providers: [PrestamoService],
  controllers: [PrestamoController]
})
export class PrestamoModule {}
