import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddFeesDto } from 'src/modules/fees/dto/addfees.dto';
import { FeesPaymentDto } from 'src/modules/fees/dto/feesRecords.dto';
import { UpdateFeesDto } from 'src/modules/fees/dto/updateFess.dto';
import { FEES_STATUS, FeesRecord } from 'src/entity/fees-record.entity';
import { Fees } from 'src/entity/fees.entity';
import { Repository } from 'typeorm';
import { FeesReceipt } from 'src/entity/fees-receipt.entity';
import { receipt_reference_no } from 'src/util/string.util';

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
    try {
      return await this.feesRepo.save(fees);
    } catch (error) {
      console.log(error);
    }
  }

  public async getFeesByLevel(level: string, schoolId: number) {
    try {
      return await this.feesRepo.findOneBy({ level, schoolId });
    } catch (error) {
      console.log(error);
    }
  }

  public async getFeesBySchool(schoolId: number) {
    try {
      return await this.feesRepo.findBy({ schoolId });
    } catch (error) {
      console.log(error);
    }
  }

  public async getFeesRecord(schoolId: number) {
    try {
      return await this.feesRecordRepo.findBy({ schoolId });
    } catch (error) {
      console.log(error);
    }
  }

  public async getStudentsWithFeesBalance(schoolId: number) {
    try {
      return await this.feesRecordRepo.findBy({
        status: FEES_STATUS.PART_PAYMENT,
        schoolId,
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async getStudentsOwingCompleteFees(schoolId: number) {
    const feesDefaulters = await this.feesRecordRepo.findAndCountBy({
      status: FEES_STATUS.OWING,
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
    try {
      const { studentId, schoolId, amount, level } = feesPayment;
      const paid = await this.feesRecordRepo.findOneBy({
        schoolId,
        studentId,
        level,
      });

      if (!paid) {
        return "This fee record does not exist! Check student's information provided and try again.";
      }
      const amountPaid = Number(paid.amountPaid) + amount;
      if (amountPaid > paid.totalFees) {
        return `The total fees is ${
          paid.totalFees
        }. You are paying in excess of ${amountPaid - paid.totalFees}`;
      }
      const feesPaid = {
        amountPaid,
        status:
          amountPaid === Number(paid.totalFees)
            ? FEES_STATUS.COMPLETE
            : FEES_STATUS.PART_PAYMENT,
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
        amount,
        studentId,
        transactionReference: receipt_reference_no,
        level: paid.level,
      });
      return feesPaid;
    } catch (error) {
      console.log(error);
    }
  }
}
