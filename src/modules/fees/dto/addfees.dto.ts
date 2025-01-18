import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddFeesDto {
  @IsString()
  @IsNotEmpty()
  schoolId: number;

  @IsString()
  @IsNotEmpty()
  level: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
