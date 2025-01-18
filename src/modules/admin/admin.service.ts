import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminDto } from 'src/modules/admin/dto/createAdmin.dto';
import { Admin } from 'src/entity/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  signJwt(admin: Partial<Admin>) {
    const payload = { email: admin.email, sub: admin.id };
    return this.jwtService.sign(payload);
  }

  async createAdmin(data: CreateAdminDto): Promise<Admin | any> {
    try {
      const { firstName, lastName, password, email } = data;
      const fullName = `${firstName} ${lastName}`;
      const passwordHash = await bcrypt.hash(password, 10);
      const newAdmin = {
        firstName,
        lastName,
        fullName,
        password: passwordHash,
        email,
      };
      const adminAdded = await this.adminRepo.save(new Admin(newAdmin));
      return { success: true, admin: adminAdded };
    } catch (error) {
      console.log(error);
    }
  }

  async login(email: string, password: string): Promise<Admin | any> {
    try {
      const adminExists = await this.adminRepo.findOneBy({ email: email });
      const correctPassword = await bcrypt.compare(
        password,
        adminExists.password,
      );
      if (!correctPassword) {
        return { success: false, message: 'Wrong password' };
      }
      if (adminExists && correctPassword) {
        const { password, ...result } = adminExists;
        return {
          success: true,
          admin: result,
          accessToken: this.signJwt(result),
        };
      } else
        return {
          success: false,
          message: 'Wrong credentials',
        };
    } catch (error) {
      console.log(error);
    }
  }
}
