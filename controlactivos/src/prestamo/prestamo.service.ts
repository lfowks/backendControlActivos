import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prestamo } from 'src/Entities/prestamo.entity';
import { Repository } from 'typeorm';
import { CrearPrestamoDto } from './dto/CrearPrestamoDto';

@Injectable()
export class PrestamoService {
  constructor(
    @InjectRepository(Prestamo)
    private prestamoRepository: Repository<Prestamo>,
  ) {}

  async solicitarPrestamo(prestamoDto: CrearPrestamoDto, userId: number) {
    // Aquí puedes buscar el usuario y el activo asociados
    const prestamo = this.prestamoRepository.create({
      ...prestamoDto,
      user: { id: userId },  // Asignamos el usuario autenticado al préstamo
      estado: 'pendiente',
      fecha_solicitud: new Date(),
    });

    return await this.prestamoRepository.save(prestamo);
  }

  async aprobarPrestamo(id: number): Promise<Prestamo> {
    const prestamo = await this.prestamoRepository.findOne({ where: { prestamo_id: id } });
    if (!prestamo) {
      throw new NotFoundException('Prestamo no encontrado');
    }
    prestamo.estado = 'aprobado';
    prestamo.fecha_aprobacion = new Date();
    return this.prestamoRepository.save(prestamo);
  }

  async listarPrestamos(): Promise<Prestamo[]> {
    return this.prestamoRepository.find({ relations: ['user', 'activo', 'ubicacion_origen', 'ubicacion_destino'] });
  }
}

