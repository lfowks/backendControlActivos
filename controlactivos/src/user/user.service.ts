import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { createUserDTO } from 'src/dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { updateUserDTO } from 'src/dto/update-user.dto';


@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    // createUserDTO(user: createUserDTO) {
    //     const newUser = this.userRepository.create(user)
    //     return this.userRepository.save(newUser)
    // }

    async createUser(user: User) {
        try {
            const newUser = this.userRepository.create(user)
            return await this.userRepository.save(newUser)
        } catch (error) {
            throw new BadRequestException('No se pudo crear un Usuario')
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
            throw new NotFoundException('No se encontro el usuario con ${id}')
        }
        return user;
    }

    async updateUser(id: number, user: updateUserDTO) {
        const existingUser = this.userRepository.findOne({ where: { id } });
        if (!existingUser) {
            throw new NotFoundException('No se encontro el Usuario')
        } try {
            await this.userRepository.update({ id }, user)
            return this.userRepository.findOne({ where: { id } });
        } catch (error) {
            throw new BadRequestException('Error al actualizar usuario')
        }
    }

    async deleteUser(id: number) {
        const user = await this.userRepository.findOne({where:{id}});
        if(!user){
            throw new NotFoundException('No se encontro el Usuario')
        } try{
            return this.userRepository.delete(id);
        } catch(error) {
            throw new BadRequestException('Error al eliminar el Usuario')
        }
    }

}
