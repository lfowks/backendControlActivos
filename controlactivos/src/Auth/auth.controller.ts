import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './AuthService';
import { LoginDTO } from './dto/LoginDTO';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDTO) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.contraseña);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return this.authService.login(user);
  }
}
