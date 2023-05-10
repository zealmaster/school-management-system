import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (!user) {
      return 'Incorrect username';
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
      // return user.username + ' is a correct user.';
    }
    return 'password incorrect';
  }

  async login(user: any) {
    return user;
  }

  // For Jwt-strategy
  async loginUser(user: any) {
    return user;
    // if (user) {
    //   return (
    //     user.username +
    //     ',You are successfully logged in. You can now add your school details.'
    //   );
    // }
    // const payload = {
    //   user: {
    //     id: user.user.id,
    //     email: user.user.email,
    //     name: user.user.username,
    //   },
    // };
    // return await {
    //   access_token: this.jwtService.sign(payload),
    // };
  }
}
