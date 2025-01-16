import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { TwoFa } from 'src/entity/twoFa.entity';
import { User } from 'src/entity/user.entity';
dotenv.config();

@Module({
  providers: [EmailService],
  controllers: [EmailController],
  exports: [EmailService],
  imports: [TypeOrmModule.forFeature([TwoFa, User])],
})
export class EmailModule {}
