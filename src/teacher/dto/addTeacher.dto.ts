import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddTeacherDto {
  @IsString()
  firstName: string;
 
  @IsString()
  @IsOptional()
  title: string;

  @IsNumber()
  schoolId: number;

  @IsString()
  dateOfBirth: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
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