import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddFeesDto } from 'src/modules/fees/dto/addfees.dto';
import { FeesPaymentDto } from 'src/modules/fees/dto/feesRecords.dto';
import { UpdateFeesDto } from 'src/modules/fees/dto/updateFess.dto';
import { FeesRecord } from 'src/entity/fees-record.entity';
import { Fees } from 'src/entity/fees.entity';
import { Repository } from 'typeorm';
import { FeesReceipt } from 'src/entity/fees-receipt.entity';

export const FEES_STATUS = {
  complete: 1,
  partPayment: 0,
  default: 2,
};

export const receipt_reference_no = `FEES-${Math.round(
  Math.random() * 100000,
)}-${Date.now().toString().slice(0, 7)}-${generateRandomString(2)}`;

function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

@Injectable()
export class FeesService {
  constructor(
    @InjectRepository(Fees)
    private feesRepo: Repository<Fees>,
    @InjectRepository(FeesRecord)
    private feesRecordRepo: Repository<FeesRecord>,
    @InjectRepository(FeesReceipt)
    private feesReceiptRepo: Repository<FeesReceipt>,
  ) {}

  public async addFees(fees: AddFeesDto) {
    console.log(fees);
    return await this.feesRepo.save(fees);
  }

  public async getFeesByLevel(level: string, schoolId: number) {
    return await this.feesRepo.findOneBy({ level, schoolId });
  }

  public async getFeesBySchool(schoolId: number) {
    return await this.feesRepo.findBy({ schoolId });
  }

  public async getFeesRecord(schoolId: number) {
    return await this.feesRecordRepo.findBy({ schoolId });
  }

  public async getStudentsWithFeesBalance(schoolId: number) {
    return await this.feesRecordRepo.findBy({
      status: FEES_STATUS.partPayment,
      schoolId,
    });
  }

  public async getStudentsOwingCompleteFees(schoolId: number) {
    const feesDefaulters = await this.feesRecordRepo.findAndCountBy({
      status: FEES_STATUS.default,
      schoolId,
    });
    return { feesDefaulters };
  }

  public async getStudentFees(schoolId: number, studentId: number) {
    return await this.feesRecordRepo.findOneBy({ schoolId, studentId });
  }

  public async updateFees(id: number, fees: UpdateFeesDto) {
    return await this.feesRepo.update(id, fees);
  }

  //Student/Parent action
  public async payFees(feesPayment: FeesPaymentDto) {
    const studentId = Number(feesPayment.studentId);
    const schoolId = Number(feesPayment.schoolId);
    const amount = Number(feesPayment.amount);
    const paid = await this.feesRecordRepo.findOneBy({
      schoolId,
      studentId,
      level: feesPayment.level,
    });
    if (!paid){
      return "This fee record does not exist! Check student's information provided and try again.";
    }
    const amountPaid = Number(paid.amountPaid) + amount;
    if (amountPaid > paid.totalFees){
      return `The total fees is ${
        paid.totalFees
      }. You are paying in excess of ${amountPaid - paid.totalFees}`;
    }
    const feesPaid = {
      amountPaid,
      status:
        amountPaid === Number(paid.totalFees)
          ? FEES_STATUS.complete
          : FEES_STATUS.partPayment,
      balance: Number(paid.totalFees) - amountPaid,
      session: feesPayment.session,
    };
    await this.feesRecordRepo.update(
      {
        studentId: studentId,
        schoolId: schoolId,
        level: paid.level,
      },
      feesPaid,
    );
    await this.feesReceiptRepo.save({
      amount: amount,
      studentId,
      transactionReference: receipt_reference_no,
      level: paid.level,
    });
    return feesPaid
  }
}
