import { Body, Controller, Post } from '@nestjs/common';
import { AdminLoginDto } from 'src/modules/admin/dto/adminLogin.dto';
import { CreateAdminDto } from 'src/modules/admin/dto/createAdmin.dto';
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
    return await this.adminService.login(
      adminLogin.email,
      adminLogin.password,
    );
  }
}
