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
  async login(@Request() req, @Session() session: Record<string, any>) {
    return this.authService.login(req.user);
  }

  @Get('')
 async getAuthSession( @Session() session: Record<string, any>){
  session.authenticated = true;
  return session;
 }
  
  @Get('logout')
  logout(@Session() session: Record<string, any>) {
    //Destroy sessiont
    session.Destroy;
    return 'Logout successful';
  }

  @Get()
  protected() {
    return {
      message: 'This route is protected against unauthenticated users!',
    };
  }
}
