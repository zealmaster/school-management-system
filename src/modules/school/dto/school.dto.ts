import { IsNotEmpty, IsNumber, Length } from 'class-validator';
export class SchoolDto {
  @IsNotEmpty()
  @Length(3, 255)
  name: string;

  @IsNotEmpty()
  @Length(3, 255)
  address: string;

  @IsNumber()
  locationId: number;

  @IsNumber()
  userId: number;
}
