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
import { AdminJwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('teacher')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @Post('add-teacher')
  @UsePipes(ValidationPipe)
  @UseGuards(AdminJwtAuthGuard)
  async addTecher(@Body() teacher: AddTeacherDto) {
    return await this.teacherService.addTeacher(teacher);
  }

  @Put('assign-subject')
  @UseGuards(AdminJwtAuthGuard)
  async assignSubject(@Body() body) {
    await this.teacherService.assignSubject(body.subjectId, body.teacherId);
  }

  @Get('teachers')
  @UseGuards(AdminJwtAuthGuard)
  async getAllTeachers() {
    return await this.teacherService.getAllTeachers();
  }
}
