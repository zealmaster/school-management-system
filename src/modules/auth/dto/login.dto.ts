import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @Length(3)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(3)
  password: string;
}
