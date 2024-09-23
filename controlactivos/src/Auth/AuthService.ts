import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from '../Entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, contraseña: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);
    if (!isPasswordValid) {
      return null;
    }

    return user;  // Retornamos el usuario completo con las relaciones cargadas
  }

  async login(user: User) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.rol.nombre,
      ubicaciones: user.ubicaciones.map((ubicacion) => ({ id: ubicacion.id, nombre: ubicacion.nombre })),
      nombre: user.nombre,  // Incluye el nombre del usuario
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

