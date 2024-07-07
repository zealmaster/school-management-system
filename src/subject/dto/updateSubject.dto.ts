import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSubjectDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  level: string;

  @IsNumber()
  @IsOptional()
  schoolId: number;

  @IsNumber()
  @IsOptional()
  teacherId: number;

  @IsString()
  @IsOptional()
  session: string;
}
