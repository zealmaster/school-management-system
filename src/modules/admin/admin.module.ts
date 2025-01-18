import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/entity/admin.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import * as dotenv from 'dotenv';
dotenv.config()

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
  imports: [
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({ secret: process.env.ADMIN_JWT_SECRET }),
  ],
})
export class AdminModule {}
