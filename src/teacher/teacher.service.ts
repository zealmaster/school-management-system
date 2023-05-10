import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddTeacherDto } from 'src/dto/addTeacher.dto';
import { Teacher } from 'src/entity/teacher.entity';
import { Subject } from 'src/entity/subject.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepo: Repository<Teacher>,
    @InjectRepository(Subject)
    private subjectRepo: Repository<Subject>,
  ) {}

  public async addTeacher(teacher: AddTeacherDto) {
    return await this.teacherRepo.save(teacher);
  }

  public async assignSubject(subjectId: number, teacherId: number) {
    const teacher = await this.teacherRepo.findOneBy({ id: teacherId });
    if (teacher) {
      await this.subjectRepo.update(subjectId, { teacherId: teacherId });
}
  }
}
