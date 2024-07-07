import { IsNotEmpty, Length } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @Length(3, 255)
  first_name: string;

  @IsNotEmpty()
  @Length(3, 255)
  last_name: string;

  @IsNotEmpty()
  @Length(3, 255)
  username: string;

  @IsNotEmpty()
  @Length(3)
  email: string;

  @IsNotEmpty()
  password: string;

}
