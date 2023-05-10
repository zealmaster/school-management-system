import { IsOptional, IsString } from 'class-validator';

export class AddTeacherDto {
  @IsString()
  firstName: string;
 
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  lastName: string;

  @IsString()
  middleName: string;

  @IsString()
  sex: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

}