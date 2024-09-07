import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../Entities/user.entity';
import { UpdateUserDTO } from 'src/user/dto/update-user.dto';
import { Rol } from 'src/Entities/rol.entity';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Rol)
        private rolRepository: Repository<Rol>
    ) { }

    async createUser(createUserDTO: CreateUserDTO) {
        try {
            const rol = await this.rolRepository.findOne({ where: { id: createUserDTO.rolId } });
            if (!rol) {
                throw new NotFoundException('Rol no encontrado');
            }
            const newUser = this.userRepository.create({
                ...createUserDTO,
                rol,
            });
            return await this.userRepository.save(newUser);
        } catch (error) {
            throw new BadRequestException('No se pudo crear el usuario');
        }
    }

    async getAllUsers() {
        try {
            return await this.userRepository.find({relations: ['rol']});
        } catch (error) {
            throw new NotFoundException('No se pudieron encontrar los Usuarios');
        }
    }

    async getUser(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('No se encontro el usuario');
        }
        return user;
    }

    async updateUser(id: number, updateUserDTO: UpdateUserDTO) {

        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('No se encontró el usuario');
        } try {
            if (updateUserDTO.rolId) {
                const rol = await this.rolRepository.findOne({ where: { id: updateUserDTO.rolId } });
                if (!rol) {
                    throw new NotFoundException('Rol no encontrado');
                }
                user.rol = rol;
            }
            Object.assign(user, updateUserDTO);
            return await this.userRepository.save(user);
        } catch (error) {
            throw new BadRequestException('Error al actualizar el usuario');
        }
    }

    async deleteUser(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('No se encontro el Usuario');
        } try {
            return this.userRepository.delete(id);
        } catch (error) {
            throw new BadRequestException('Error al eliminar el Usuario')
        }
    }

}
