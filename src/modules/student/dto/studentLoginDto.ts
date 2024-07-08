import { IsString } from 'class-validator';

export class StudentLoginDto {
  @IsString()
  studentId: number;

  @IsString()
  password: string;
}
