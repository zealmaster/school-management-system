import { IsString, Length } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  @Length(5)
  password: string;
}
