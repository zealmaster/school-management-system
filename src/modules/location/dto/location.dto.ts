import { IsNotEmpty, Length } from 'class-validator';

export class LocationDto {
  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  state: string;
}
