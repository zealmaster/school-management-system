import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddSubjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  level: string;

  @IsNumber()
  @IsNotEmpty()
  schoolId: number;

  @IsNumber()
  @IsOptional()
  teacherId: number;

  @IsString()
  @IsNotEmpty()
  session: string;
}
