import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { User } from '../Entities/user.entity';
import { UpdateUserDTO } from 'src/user/dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post()
    createUser(@Body() createUserDTO: CreateUserDTO): Promise<User> {
        return this.userService.createUser(createUserDTO);
    }

    @Get()
    getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    getUser(@Param('id') id: number) {
        return this.userService.getUser(id);
    }

    @Get('docente')
    async getDocentes(): Promise<User[]> {
      return this.userService.getAllDocentes();
    }

    @Patch(':id')
    updateUser(@Param('id') id: number, @Body() updateUserDTO: UpdateUserDTO) {
        return this.userService.updateUser(id, updateUserDTO);
    }

    @Delete(":id")
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id);
    }

}
