import { Module } from '@nestjs/common';
import { FeesController } from './fees.controller';
import { FeesService } from './fees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fees } from 'src/entity/fees.entity';
import { FeesRecord } from 'src/entity/fees-record.entity';
import { FeesReceipt } from 'src/entity/fees-receipt.entity';

@Module({
  controllers: [FeesController],
  providers: [FeesService],
  exports: [FeesService],
  imports: [TypeOrmModule.forFeature([Fees, FeesRecord, FeesReceipt])],
})

export class FeesModule {}
