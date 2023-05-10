import { IsString } from 'class-validator';

export class AdminLoginDto {
  @IsString()
  email: string;
  
  @IsString()
  password: string;
}
