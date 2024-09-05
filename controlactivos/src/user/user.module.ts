import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '../Entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from 'src/Entities/rol.entity';
import { ProveedorService } from 'src/proveedor/proveedor.service';
import { RolService } from 'src/rol/rol.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Rol])],
  controllers: [UserController],
  providers: [UserService, RolService],
  exports: [UserService]
})
export class UserModule {}
