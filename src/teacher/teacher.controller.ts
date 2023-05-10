import { Controller, Get } from '@nestjs/common';
import { TeacherService } from './teacher.service';

@Controller('teacher')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @Get('assign-subject')
  async assignSubject(subjectId: number, teacherId: number) {
    await this.teacherService.assignSubject(subjectId, teacherId);
  }
}
