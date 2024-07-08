import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from 'src/entity/school.entity';
import { Location } from 'src/entity/location.entity';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { User } from 'src/entity/user.entity';
import { Student } from 'src/entity/student.entity';
import { FeesRecord } from 'src/entity/fees-record.entity';
import { Fees } from 'src/entity/fees.entity';
import { FeesReceipt } from 'src/entity/fees-receipt.entity';
import { FeesService } from 'src/modules/fees/fees.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      School,
      Location,
      User,
      Student,
      FeesRecord,
      Fees,
      FeesReceipt,
    ]),
  ],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
