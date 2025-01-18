import { IsNotEmpty, IsString } from 'class-validator';

export class StudentLoginDto {
  @IsString()
  @IsNotEmpty()
  studentId: number;

  @IsString()
  @IsNotEmpty()
  password: string;
}
