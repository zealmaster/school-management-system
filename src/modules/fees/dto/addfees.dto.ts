import { IsNumber, IsString } from 'class-validator';

export class AddFeesDto {
  @IsString()
  schoolId: number;

  @IsString()
  level: string;

  @IsNumber()
  amount: number;
}
