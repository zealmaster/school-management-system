import { Controller, Post, Get, UseGuards, Body } from '@nestjs/common';
import { FeesService } from './fees.service';
import { AddFeesDto } from 'src/modules/fees/dto/addfees.dto';
import { FeesPaymentDto } from 'src/modules/fees/dto/feesRecords.dto';
import { Fees } from 'src/entity/fees.entity';
import { AdminJwtAuthGuard, UserJwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('fees')
export class FeesController {
  constructor(private feesService: FeesService) {}

  @Post('add-fees')
  @UseGuards(AdminJwtAuthGuard)
  async addFess(@Body() addFees: AddFeesDto): Promise<Fees> {
    return await this.feesService.addFees(addFees);
  }

  @Get('')
  @UseGuards(AdminJwtAuthGuard)
  async getFees(schoolId: number) {
    return await this.feesService.getFeesBySchool(schoolId);
  }

  @Get('fees-record')
  @UseGuards(AdminJwtAuthGuard)
  async getFeesRecords(@Body() body) {
    return await this.feesService.getFeesRecord(body.schoolId);
  }
  @Get('fees-part-payment')
  @UseGuards(AdminJwtAuthGuard)
  async getFeesPartPayment(@Body() body) {
    return await this.feesService.getStudentsWithFeesBalance(body.schoolId);
  }
  @Get('fees-defaulters')
  @UseGuards(AdminJwtAuthGuard)
  async getFeesDefaulters(@Body() body) {
    return await this.feesService.getStudentsOwingCompleteFees(body.schoolId);
  }

  @Post('pay-fees')
  @UseGuards(UserJwtAuthGuard)
  async payFees(@Body() feespayment: FeesPaymentDto) {
    return await this.feesService.payFees(feespayment);
  }
}
