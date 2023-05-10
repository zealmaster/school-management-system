import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { loginDto } from 'src/dto/login.dto';
import { userDto } from 'src/dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async fetchUsers() {
    return await this.userService.fetchUsers();
  }
  @Post('signup')
  signUp(@Body() userDto: userDto) {
    return this.userService.signUp(userDto);
  }

  @Post('login')
  async login(@Body() loginDto: loginDto) {
    return await this.userService.login(loginDto);
  }
}
