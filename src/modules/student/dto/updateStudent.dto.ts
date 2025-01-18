import { IsOptional, IsString } from 'class-validator';

export class UpdateStudentDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  middleName: string;

  @IsString()
  @IsOptional()
  dateOfBirth: string;

  @IsString()
  @IsOptional()
  level: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  parentName: string;

  @IsString()
  @IsOptional()
  parentPhone: string;

  @IsString()
  @IsOptional()
  passportPicture: string;

  @IsString()
  @IsOptional()
  graduationYear: string;

  @IsString()
  @IsOptional()
  graduationSession: string;

}
