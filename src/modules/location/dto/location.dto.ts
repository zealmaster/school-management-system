import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LocationDto {
  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  state: string;
}
