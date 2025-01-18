import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateFeesDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
