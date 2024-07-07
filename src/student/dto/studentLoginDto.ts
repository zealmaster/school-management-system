import { IsString } from 'class-validator';

export class StudentLoginDto {
  @IsString()
  studentId: string;

  @IsString()
  password: string;
}
