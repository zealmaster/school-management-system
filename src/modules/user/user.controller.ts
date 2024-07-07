import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async fetchUsers() {
    return await this.userService.fetchUsers();
  }
  @Post('register')
  signUp(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

}
