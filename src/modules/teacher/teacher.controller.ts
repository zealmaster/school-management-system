import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { AddTeacherDto } from 'src/modules/teacher/dto/addTeacher.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('teacher')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @Post('add-teacher')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  async addTecher(@Body() teacher: AddTeacherDto) {
    return await this.teacherService.addTeacher(teacher);
  }

  @Put('assign-subject')
  @UseGuards(AuthGuard('jwt'))
  async assignSubject(@Body() body) {
    await this.teacherService.assignSubject(body.subjectId, body.teacherId);
  }

  @Get('teachers')
  @UseGuards(AuthGuard('jwt'))
  async getAllTeachers() {
    return await this.teacherService.getAllTeachers();
  }
}
