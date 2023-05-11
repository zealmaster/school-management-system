import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { Student } from 'src/entity/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeesService } from 'src/fees/fees.service';
import { Fees } from 'src/entity/fees.entity';
import { FeesRecord } from 'src/entity/fees-record.entity';
import { FeesReceipt } from 'src/entity/fees-receipt.entity';
import { StudentLogin } from 'src/entity/studentLogin.entity';

@Module({
  controllers: [StudentController],
  providers: [StudentService, FeesService],
  imports: [
    TypeOrmModule.forFeature([
      Student,
      Fees,
      FeesRecord,
      FeesReceipt,
      StudentLogin,
    ]),
  ],
  exports: [StudentService],
})
export class StudentModule {}
