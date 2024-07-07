import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from 'src/entity/location.entity';
import { School } from 'src/entity/school.entity';
import { SchoolService } from 'src/modules/school/school.service';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { State } from 'src/entity/state.entity';
import { City } from 'src/entity/city.entity';
import { Student } from 'src/entity/student.entity';
import { FeesRecord } from 'src/entity/fees-record.entity';
import { FeesService } from 'src/modules/fees/fees.service';
import { Fees } from 'src/entity/fees.entity';
import { FeesReceipt } from 'src/entity/fees-receipt.entity';
import { UserService } from 'src/modules/user/user.service';
import { User } from 'src/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Location,
      School,
      State,
      City,
      Student,
      FeesRecord,
      Fees,
      FeesReceipt,
    ]),
  ],
  controllers: [LocationController],
  providers: [LocationService, SchoolService],
  exports: [LocationService],
})
export class LocationModule {}
