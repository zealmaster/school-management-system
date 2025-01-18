import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { AuthGuard } from '@nestjs/passport';
import { AddSubjectDto } from './dto/addSubject.dto';
import { UpdateSubjectDto } from './dto/updateSubject.dto';
import { AdminJwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('subject')
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  @Post('add-subject')
  @UseGuards(AdminJwtAuthGuard)
  async addSubject(@Body() subject: AddSubjectDto) {
    return await this.subjectService.addSubject(subject);
  }

  @Put('update-subject/:id')
  @UseGuards(AdminJwtAuthGuard)
  async updateSubject(
    @Param('id') id: number,
    @Body() subject: UpdateSubjectDto,
  ) {
    return await this.subjectService.updateSubject(id, subject);
  }

  @Get('all-subjects')
  @UseGuards(AdminJwtAuthGuard)
  async getAllSubjects() {
    return await this.subjectService.getAllSubject();
  }
}
