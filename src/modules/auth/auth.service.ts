import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { EmailService } from '../email/email.service';
import { User } from 'src/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) { }

  signJWT(user: Partial<User>) {
    const payload = { email: user.email, sub: user.id, name: user.username };
    return {
      access_token: this.jwtService.sign(payload),
      ...user,
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findUserByEmail(email);
      if (!user) {
        return { success: false, message: 'Incorrect email' };
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (user && isMatch) {
        const { password, ...result } = user;
        return { success: true, user: result };
      }
      return { success: false, message: 'password incorrect' };

    } catch (error) {
      console.log(error);
    }
  }

  async initiateLogin(data: LoginDto) {
    try {
      const user = await this.userService.findUserByEmail(data.email);
      if (user && (await bcrypt.compare(data.password, user.password))) {
        //send the two fa code
        this.emailService.sendTwoFaCode(user.id, user.email);
        return true;
      } else {
        throw new HttpException('Wrong credentials provided ', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException('Wrong credentials provided ', HttpStatus.BAD_REQUEST);
    }
  }

  async login(user: any, twoFaCode: string) {
    try {
      if (!twoFaCode) return false;
      const confirmTwoFaCode = await this.emailService.confirmTwoFaCode(user.id, twoFaCode);
      if (!confirmTwoFaCode) return false;
      const payload = { email: user.email, sub: user.id, countryId: user.countryId, status: user.status };
      return {
        ...user,
        access_token: this.signJWT(payload),
      };
    } catch (error) {
      return { success: false, message: error };
    }
  }

}
