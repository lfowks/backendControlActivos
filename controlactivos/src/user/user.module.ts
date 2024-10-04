import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '../Entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from 'src/Entities/rol.entity';
import { RolService } from 'src/rol/rol.service';
import { Ubicacion } from 'src/Entities/ubicacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Rol, Ubicacion])],
  controllers: [UserController],
  providers: [UserService, RolService],
  exports: [UserService]
})
export class UserModule {}
