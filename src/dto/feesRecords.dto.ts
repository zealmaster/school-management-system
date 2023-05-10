import { IsNumber, IsString } from 'class-validator';

export class FeesPaymentDto {
  @IsNumber()
  studentId: number;

  @IsNumber()
  schoolId: number;

  @IsNumber()
  totalFees: number;

  @IsString()
  level: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  balance: number;

  @IsNumber()
  status: number;

  @IsString()
  session: string;
}
