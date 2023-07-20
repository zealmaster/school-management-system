import { IsString } from 'class-validator';

export class StudentLoginDto {
  @IsString()
  teacherId: string;

  @IsString()
  password: string;
}
