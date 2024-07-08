import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddSubjectDto {
  @IsString()
  name: string;

  @IsString()
  level: string;

  @IsNumber()
  schoolId: number;

  @IsNumber()
  @IsOptional()
  teacherId: number;

  @IsString()
  session: string;
}
