import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from 'src/modules/auth/constants';
import { Admin } from 'src/entity/admin.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
  imports: [
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({ secret: jwtConstants.secret }),
  ],
})
export class AdminModule {}
