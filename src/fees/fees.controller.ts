import { Controller, Post, Get, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FeesService } from './fees.service';
import { AddFeesDto } from 'src/dto/addFees.dto';
import { FeesPaymentDto } from 'src/dto/feesRecords.dto';
import { Fees } from 'src/entity/fees.entity';

@Controller('fees')
export class FeesController {
  constructor(private feesService: FeesService) {}

  @Post('add-fees')
  @UseGuards(AuthGuard('jwt'))
  async addFess(@Body() addFees: AddFeesDto): Promise<Fees> {
    return await this.feesService.addFees(addFees);
  }

  @Get('')
  @UseGuards(AuthGuard('jwt'))
  async getFees(schoolId: number) {
    return await this.feesService.getFeesBySchool(schoolId);
  }

  @Get('fees-record')
  async getFeesRecords(@Body() body) {
    return await this.feesService.getFeesRecord(body.schoolId);
  }
  @Get('fees-part-payment')
  async getFeesPartPayment(@Body() body) {
    return await this.feesService.getStudentsWithFeesBalance(body.schoolId);
  }
  @Get('fees-defaulters')
  async getFeesDefaulters(@Body() body) {
    return await this.feesService.getStudentsOwingCompleteFees(body.schoolId);
  }

  @Post('pay-fees')
  @UseGuards(AuthGuard('jwt'))
  async payFees(@Body() feespayment: FeesPaymentDto) {
    return await this.feesService.payFees(feespayment);
  }
}
