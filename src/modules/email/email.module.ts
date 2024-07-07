import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Verification } from 'src/entity/verification.entity';
import { User } from 'src/entity/user.entity';
dotenv.config();

@Module({
  providers: [EmailService],
  controllers: [EmailController],
  exports: [EmailService],
  imports: [TypeOrmModule.forFeature([Verification, User])],
})
export class EmailModule {}
