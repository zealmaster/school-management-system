import { IsNumber } from 'class-validator';

export class UpdateFeesDto {
  @IsNumber()
  amount: number;
}
