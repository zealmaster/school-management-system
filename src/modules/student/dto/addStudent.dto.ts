import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddStudentDto {
  @IsNumber()
  schoolId: number;

  @IsNumber()
  studentId: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  middleName: string;

  @IsDate()
  dateOfBirth: string;

  @IsString()
  level: string;

  @IsString()
  address: string;

  @IsString()
  sex: string;

  @IsString()
  parentName: string;

  @IsString()
  parentPhone: string;

  @IsString()
  passportPicture: string;

  @IsString()
  admissionYear: string;

  @IsString()
  admissionSession: string;

  @IsString()
  graduationYear: string;

  @IsString()
  graduationSession: string;
}
