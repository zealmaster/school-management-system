import {
  Controller,
  Get,
  Request,
  UseGuards,
  Session,
  Post,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login/init')
  async initiatelogin(@Body() body: LoginDto) {
    const user = await this.authService.initiateLogin(body);
    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }
    return {
      success: true,
      msg: 'Enter the two factor authentication code sent to your email',
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() body) {
    const user = await this.authService.login(req.user, body.twoFaCode);
    if (!user) {
      return { success: false, msg: 'Invalid authentication code' };
    }
    return user;
  }
}
