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

    const { contraseña: pass, ...result } = user;
    return result as User;  // Retornamos el usuario sin la contraseña
  }

  async login(user: any) {
    // Aquí incluimos las ubicaciones en el payload del token
    const payload = { 
      email: user.email, 
      sub: user.id, 
      userId: user.id, 
      role: user.rol.nombre,
      ubicaciones: user.ubicaciones.map((ubicacion) => ({ id: ubicacion.id, nombre: ubicacion.nombre }))
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
