import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FeesPaymentDto {
  @IsNumber()
  @IsNotEmpty()
  studentId: number;

  @IsNumber()
  @IsNotEmpty()
  schoolId: number;

  @IsNumber()
  @IsNotEmpty()
  totalFees: number;

  @IsString()
  @IsNotEmpty()
  level: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  balance: number;

  @IsNumber()
  @IsNotEmpty()
  status: number;

  @IsString()
  @IsNotEmpty()
  session: string;
}
