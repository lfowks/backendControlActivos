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

  // Valida si el usuario existe y si la contraseña es correcta
  async validateUser(email: string, contraseña: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      return null;
    }

    // Verificamos la contraseña de manera asíncrona
    const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);
    if (!isPasswordValid) {
      return null;
    }

    const { contraseña: pass, ...result } = user;
    return result as User;  // Retornamos el usuario sin la contraseña
  }

  // Genera el token JWT al hacer login
  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.rol.nombre };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
