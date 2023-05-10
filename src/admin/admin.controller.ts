import { Body, Controller, Post } from '@nestjs/common';
import { AdminLoginDto } from 'src/dto/adminLogin.dto';
import { CreateAdminDto } from 'src/dto/createAdmin.dto';
import { Admin } from 'src/entity/admin.entity';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post()
  async createAdmin(@Body() addAdmin: CreateAdminDto) {
    return await this.adminService.createAdmin(addAdmin);
  }

  @Post('login')
  async adminLogin(@Body() adminLogin: AdminLoginDto): Promise<Admin> {
    return await this.adminService.addLogin(
      adminLogin.email,
      adminLogin.password,
    );
  }
}
