import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { EmailModule } from 'src/email/email.module';
import { Verification } from 'src/entity/verification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Verification]),
    JwtModule.register({ secret: jwtConstants.secret }),
    EmailModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
