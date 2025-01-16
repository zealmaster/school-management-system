import { IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @Length(3)
  email: string;

  @IsNotEmpty()
  @Length(3)
  password: string;
}
