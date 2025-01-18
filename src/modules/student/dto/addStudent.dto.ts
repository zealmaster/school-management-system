import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddStudentDto {
  @IsNumber()
  @IsNotEmpty()
  schoolId: number;

  @IsNumber()
  @IsNotEmpty()
  studentId: number;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  middleName: string;

  @IsDate()
  @IsNotEmpty()
  dateOfBirth: string;

  @IsString()
  @IsNotEmpty()
  level: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  sex: string;

  @IsString()
  @IsNotEmpty()
  parentName: string;

  @IsString()
  @IsNotEmpty()
  parentPhone: string;

  @IsString()
  @IsOptional()
  passportPicture: string;

  @IsString()
  @IsNotEmpty()
  admissionYear: string;

  @IsString()
  @IsNotEmpty()
  admissionSession: string;

  @IsString()
  @IsOptional()
  graduationYear: string;

  @IsString()
  @IsOptional()
  graduationSession: string;
}
