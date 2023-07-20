import { IsNotEmpty, Length } from 'class-validator';

export class locationDto {
  @IsNotEmpty()
  location: string;
  
  @IsNotEmpty()
  state: string;
}
