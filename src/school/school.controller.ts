import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  ParseIntPipe,
  Put,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { SchoolService } from './school.service';
import { schoolDto } from '../dto/school.dto';
import { School } from '../entity/school.entity';
import { UpdateSchoolDto } from '../dto/updateSchool.dto';
import { AuthGuard } from '@nestjs/passport';
import { AddStudentDto } from 'src/dto/addStudent.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import * as path from 'path';

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

@Controller('school')
export class SchoolController {
  constructor(private schoolService: SchoolService) {}

  // School Dashboard
  // student entity actions
  @Post('student')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('passportPicture', { storage }))
  async addStudent(
    @Body() student: AddStudentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Passport picture is required');
    }
    return await this.schoolService.addStudent({
      passportPicture: file.path,
      ...student,
    });
}

  @Put('student/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  async updateStudent(
    @Param('id', ParseIntPipe) id: number,
    student: UpdateSchoolDto,
  ) {
    return await this.schoolService.updateSchool(id, student);
  }

  @Delete('student/:id')
  @UseGuards(AuthGuard('jwt'))
  async removeStudent(@Param('id', ParseIntPipe) id: number) {
    return await this.schoolService.removeStudent(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('passportPicture'))
  async upload(@UploadedFile() file) {
    console.log(file);
  }
  @Get('students')
  @UseGuards(AuthGuard('jwt'))
  async getAllStudents() {
    return await this.schoolService.getAllStudents();
  }

  // School entity
  @Get('')
  getSchool() {
    return this.schoolService.fetchSchool();
  }
  @Get(':id')
  async schoolById(@Param('id', ParseIntPipe) id: number) {
    const aschool = await this.schoolService.schoolById(id);
    return {
      name: aschool.name,
      address: aschool.address,
      location: aschool.user,
      Added_by: aschool.user.username,
    };
  }

  @Put(':id')
  async updateSchool(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateSchoolDto,
  ) {
    return await this.schoolService.updateSchool(id, updateDto);
  }

  @Delete(':id')
  async removeSchool(@Param('id', ParseIntPipe) id: number) {
    this.schoolService.deleteSchool(id);
    return 'SChool removed from the database';
  }
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async addSchool(@Body() schoolData: schoolDto): Promise<School> {
    return await this.schoolService.addSchool(schoolData);
  }
}
