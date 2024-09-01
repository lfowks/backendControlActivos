import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../Entities/user.entity';
import { updateUserDTO } from 'src/dto/update-user.dto';


@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async createUser(createUserDTO: CreateUserDTO): Promise<User> {
        try {
            const newUser = await this.userRepository.create(createUserDTO);
            return  await this.userRepository.save(newUser);
        } catch (error) {
            throw new BadRequestException('No se pudo crear el usuario')
        }
    }

    async getUsers() {
        try {
            return await this.userRepository.find()
        } catch (error) {
            throw new BadRequestException('No se pudieron encontrar los Usuarios')
        }
    }

    async getUser(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('No se encontro el usuario');
        }
        return user;
    }

    async updateUser(id: number, user: updateUserDTO) {
        const existingUser = this.userRepository.findOne({ where: { id } });
        if (!existingUser) {
            throw new NotFoundException('No se encontro el Usuario');
        } try {
            await this.userRepository.update({ id }, user);
            return this.userRepository.findOne({ where: { id } });
        } catch (error) {
            throw new BadRequestException('Error al actualizar usuario');
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
