import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/modules/email/email.service';
import { TwoFa } from 'src/entity/twoFa.entity';
import { code } from 'src/modules/email/email.service';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(TwoFa)
    private verificationRepo: Repository<TwoFa>,
    private emailService: EmailService,
  ) {}

  async createUser(data: CreateUserDto) {
    try {
      const { email, username, firstName, lastName, password } = data;
      const emailExists = await this.userRepository.findOneBy({ email });
      const usernameExists = await this.userRepository.findOneBy({ username });

      if (emailExists) {
        return { success: false, message: 'Email already exists.' };
      }
      if (usernameExists) {
        return { success: false, message: 'Username already exists.' };
      }

      const passwordHash = await bcrypt.hash(data.password, 10);
      const newUser = {
        password: passwordHash,
        username,
        email,
        firstName,
        lastName,
      };
      const user = await this.userRepository.save(newUser);
      await this.verificationRepo.save(
        new TwoFa({
          userId: user?.id,
          twoFaCode: code.toString(),
        }),
      );
      await this.emailService.sendUserConfirmation(email);

      return { success: true, user };
    } catch (error) {
      console.log(error);
    }
  }

  async findUserById(userId: number): Promise<User> {
    try {
      return await this.userRepository.findOneBy({ id: userId });
    } catch (error) {
      console.log(error);
    }
  }

  async findUserByUsername(username: string): Promise<User> {
    try {
      return await this.userRepository.findOneBy({ username });
    } catch (error) {
      console.log(error);
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneBy({ email });
    } catch (error) {
      console.log(error);
    }
  }

  // Query all users
  async fetchUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      const user = [];
      for (const i in users) {
        const userDetail = {
          id: users[i].id,
          username: users[i].username,
          firstName: users[i].firstName,
          lastName: users[i].lastName,
          email: users[i].email,
          createdAt: users[i].createdAt,
          updatedAt: users[i].updatedAt,
        };
        user.push(userDetail);
      }

      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
