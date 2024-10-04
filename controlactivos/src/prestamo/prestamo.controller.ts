import { Body, Controller, Get, Param, Patch, Post, UseGuards, Request } from '@nestjs/common';
import { PrestamoService } from './prestamo.service';
import { Prestamo } from 'src/Entities/prestamo.entity';
import { JwtAuthGuard } from 'src/Auth/JwtAuthGuard';
import { CrearPrestamoDto } from './dto/CrearPrestamoDto';

@Controller('prestamos')
export class PrestamoController {
  constructor(private readonly prestamoService: PrestamoService) {}

  @UseGuards(JwtAuthGuard) // Protegemos la ruta con el guard JWT
  @Post('solicitar')
  async solicitarPrestamo(@Body() prestamoDto: CrearPrestamoDto, @Request() req) {
    const user = req.user;
    console.log('Usuario autenticado:', user);

    // Ahora puedes usar user.userId para realizar la solicitud de préstamo
    return this.prestamoService.solicitarPrestamo(prestamoDto, user.userId);
  }

  @Patch('aprobar/:id')
  async aprobarPrestamo(@Param('id') id: number): Promise<Prestamo> {
    return this.prestamoService.aprobarPrestamo(id);
  }

  @Get()
  async listarPrestamos(): Promise<Prestamo[]> {
    return this.prestamoService.listarPrestamos();
  }
}
