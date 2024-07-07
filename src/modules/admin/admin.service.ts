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
    return {
      access_token: this.jwtService.sign(payload),
      ...admin,
    };
  }

  async createAdmin(addAdmin: CreateAdminDto): Promise<Admin | any> {
    const fullName = `${addAdmin.firstName} ${addAdmin.lastName}`;
    const passwordHash = await bcrypt.hash(addAdmin.password, 10);
    const newAdmin = {
      firstName: addAdmin.firstName,
      lastName: addAdmin.lastName,
      fullName: fullName,
      password: passwordHash,
      email: addAdmin.email,
    };
    const adminAdded = await this.adminRepo.save(newAdmin);
    return adminAdded;
  }

  async addLogin(email: string, password: string): Promise<Admin | any> {
    const existingAdmin = await this.adminRepo.findOneBy({ email: email });
    if (
      existingAdmin &&
      (await bcrypt.compare(password, existingAdmin.password))
    ) {
      const { password, ...result } = existingAdmin;
      return this.signJwt(result);
    } else
      return {
        success: false,
        message: 'Wrong credentials',
      };
  }
}
