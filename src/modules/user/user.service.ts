import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/modules/email/email.service';
import { Verification } from 'src/entity/verification.entity';
import { token } from 'src/modules/email/email.service';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Verification)
    private verificationRepo: Repository<Verification>,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  signJwt(user: Partial<User>) {
    const payload = { email: user.email, sub: user.id, name: user.username };
    return {
      access_token: this.jwtService.sign(payload),
      ...user,
    };
  }

  async createUser(userDto: CreateUserDto) {
    const passwordHash = await bcrypt.hash(userDto.password, 10);
    const newUser = {
      password: passwordHash,
      username: userDto.username,
      email: userDto.email,
      first_name: userDto.first_name,
      last_name: userDto.last_name,
    };
    await this.emailService.sendUserConfirmation(userDto);
    const user = await this.userRepository.save(newUser);
    await this.verificationRepo.save({
      userId: user.id,
      token: token.toString(),
    });
  }

  // find user by ID for use in
  findUser(id) {
    return this.userRepository.findOneBy({ id });
  }

  // User login handler without Passport module
  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOneBy({
      username: loginDto.username,
    });
    if (!user) {
      return { success: false, message: 'Incorrect username' };
    }
    // if (user.verifiedEmail === null) {
    //   return { success: false, message: 'Email not confirmed' };
    // }
    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      const { password, ...result } = user;
      return this.signJwt(result);
    }
    return { success: false, message: 'password incorrect' };
  }

  // find a user from the database by username for authentication using Passport module
  async findOne(username: string): Promise<any> {
    return await this.userRepository.findOneBy({ username });
  }

  // Query all users
  async fetchUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    const user = [];
    for (const i in users) {
      const userDetail = {
        id: users[i].id,
        username: users[i].username,
        firstName: users[i].first_name,
        lastName: users[i].last_name,
        email: users[i].email,
        createdAt: users[i].createdAt,
        updatedAt: users[i].updatedAt,
      };
      user.push(userDetail);
    }
    return user;
  }
}
