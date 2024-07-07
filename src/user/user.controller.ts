import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async fetchUsers() {
    return await this.userService.fetchUsers();
  }
  @Post('signup')
  signUp(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto);
  }
}
