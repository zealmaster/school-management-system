import { IsNotEmpty, Length } from 'class-validator';

export class loginDto {
  @IsNotEmpty()
  @Length(3)
  email: string;

  @IsNotEmpty()
  @Length(3)
  password: string;

  @IsNotEmpty()
  @Length(3)
  username: string;
}
