import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { User } from '../Entities/user.entity';
import { updateUserDTO } from 'src/dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post()
    createUser(@Body() createUserDTO: CreateUserDTO): Promise<User> {
        return this.userService.createUser(createUserDTO);
    }

    @Get()
    getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @Get(':id')
    getUser(@Param('id') id: number) {
        return this.userService.getUser(id);
    }

    @Patch(':id')
    updateUser(@Param('id') id: number, @Body() user: updateUserDTO) {
        return this.userService.updateUser(id, user);
    }

    @Delete(":id")
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id);
    }

}
