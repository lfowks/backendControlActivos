import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { In, Repository } from 'typeorm';
import { User } from '../Entities/user.entity';
import { UpdateUserDTO } from 'src/user/dto/update-user.dto';
import { Rol } from 'src/Entities/rol.entity';
import { Ubicacion } from 'src/Entities/ubicacion.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Rol)
        private rolRepository: Repository<Rol>,
        @InjectRepository(Ubicacion)
        private ubicacionRepository: Repository<Ubicacion>
    ) { }

    async createUser(createUserDTO: CreateUserDTO) {
        try {
            // Asignar siempre el rol de Docente con id 2 (por defecto)
            const rol = await this.rolRepository.findOne({ where: { id: 2 } });
            if (!rol) {
                throw new NotFoundException('Rol Docente no encontrado');
            }

            let ubicaciones = [];
            if (createUserDTO.ubicacionIds && createUserDTO.ubicacionIds.length > 0) {
                ubicaciones = await this.ubicacionRepository.findBy({
                    id: In(createUserDTO.ubicacionIds),  // Usamos la cláusula IN para buscar por múltiples IDs
                });
            
                if (ubicaciones.length !== createUserDTO.ubicacionIds.length) {
                    throw new NotFoundException('Una o más ubicaciones no fueron encontradas');
                }
            }
            

            const newUser = this.userRepository.create({
                ...createUserDTO,
                rol,  // Asignar el rol de Docente automáticamente
                ubicaciones,  // Asignar las ubicaciones seleccionadas
            });
            return await this.userRepository.save(newUser);
        } catch (error) {
            throw new BadRequestException('No se pudo crear el usuario');
        }
    }

    // Obtener todos los usuarios con sus roles y ubicaciones
    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find({
            where: { rol: { id: 2 } },
            relations: ['rol', 'ubicaciones'],
        });
    }
    
    // Obtener un usuario con sus roles y ubicaciones
    async getUser(id: number) {
        const user = await this.userRepository.findOne({ where: { id }, relations: ['rol', 'ubicaciones'] });  // Incluir ubicaciones
        if (!user) {
            throw new NotFoundException('No se encontró el usuario');
        }
        return user;
    }


    // Actualizar usuario con Ubicacion
    async updateUser(id: number, updateUserDTO: UpdateUserDTO) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('No se encontró el usuario');
        }
    
        try {
            if (updateUserDTO.rolId) {
                const rol = await this.rolRepository.findOne({ where: { id: updateUserDTO.rolId } });
                if (!rol) {
                    throw new NotFoundException('Rol no encontrado');
                }
                user.rol = rol;
            }
    
            if (updateUserDTO.ubicacionIds && updateUserDTO.ubicacionIds.length > 0) {
                const ubicaciones = await this.ubicacionRepository.findByIds(updateUserDTO.ubicacionIds);
                if (ubicaciones.length !== updateUserDTO.ubicacionIds.length) {
                    throw new NotFoundException('Una o más ubicaciones no fueron encontradas');
                }
                user.ubicaciones = ubicaciones;  // Actualizar ubicaciones
            }
    
            Object.assign(user, updateUserDTO);
            return await this.userRepository.save(user);
        } catch (error) {
            throw new BadRequestException('Error al actualizar el usuario');
        }
    }
    

    // Eliminar un usuario
    async deleteUser(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('No se encontro el Usuario');
        }
        try {
            return this.userRepository.delete(id);
        } catch (error) {
            throw new BadRequestException('Error al eliminar el Usuario');
        }
    }

}
