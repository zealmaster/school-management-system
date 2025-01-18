import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from 'src/modules/email/email.module';
import { TwoFa } from 'src/entity/twoFa.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, TwoFa]),
    EmailModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
