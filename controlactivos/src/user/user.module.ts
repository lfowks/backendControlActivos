// src/user/user.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '../Entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from 'src/Entities/rol.entity';
import { Ubicacion } from 'src/Entities/ubicacion.entity';
import { AuthModule } from 'src/auth/auth.module';  // Importa AuthModule

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Rol, Ubicacion]),
    forwardRef(() => AuthModule),  // Usa forwardRef para romper la dependencia circular
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],  // Exporta el UserService para que AuthModule pueda usarlo
})
export class UserModule {}
