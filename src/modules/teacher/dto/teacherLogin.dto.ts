import { IsNotEmpty, IsString } from 'class-validator';

export class StudentLoginDto {
  @IsString()
  @IsNotEmpty()
  teacherId: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
