import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddStudentDto } from 'src/modules/student/dto/addStudent.dto';
import { StudentService } from './student.service';
import { UpdateStudentDto } from 'src/modules/student/dto/updateStudent.dto';
import { Express } from 'express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { StudentLoginDto } from './dto/studentLoginDto';


const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/students');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName = uniqueSuffix + path.extname(file.originalname);
    cb(null, fileName);
  },
});

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  // school admin actions
  @Post('add-student')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('passportPicture', { storage }))
  async addStudent(
    @Body() student: AddStudentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Passport picture is required');
    }
    return await this.studentService.addStudent({
      passportPicture: file.path,
      ...student,
    });
  }

  @Put('student/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  async updateStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() student: UpdateStudentDto,
  ) {
    return await this.studentService.updateStudent(id, student);
  }

  @Delete('student/:id')
  @UseGuards(AuthGuard('jwt'))
  async removeStudent(@Param('id', ParseIntPipe) id: number) {
    return await this.studentService.removeStudent(id);
  }

  @Get('students')
  @UseGuards(AuthGuard('jwt'))
  async getAllStudents() {
    return await this.studentService.getAllStudents();
  }

//Student action
  @Post('login')
  async loginStudent(@Body() login: StudentLoginDto) {
    return await this.studentService.loginStudent(login);
}
}
