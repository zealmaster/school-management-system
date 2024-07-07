import {
  Controller,
  Get,
  Request,
  UseGuards,
  Session,
  Post,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req ) {
    return this.authService.login(req.user);
  }

}
