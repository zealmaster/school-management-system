import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddTeacherDto } from 'src/teacher/dto/addTeacher.dto';
import { Teacher } from 'src/entity/teacher.entity';
import { Subject } from 'src/entity/subject.entity';
import { Repository } from 'typeorm';
import { TeacherLogin } from 'src/entity/teacherLogin.entity';
import { generatePassword } from 'src/strings';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepo: Repository<Teacher>,
    @InjectRepository(Subject)
    private subjectRepo: Repository<Subject>,
    @InjectRepository(TeacherLogin)
    private teacherLoginRepo: Repository<TeacherLogin>,
  ) {}

  public async addTeacher(teacher: AddTeacherDto) {
    const addedTeacher = await this.teacherRepo.findOneBy({
      email: teacher.email,
      phone: teacher.phone,
    });
    if (addedTeacher) return 'Teacher already added';
    const newTeacher = await this.teacherRepo.save(teacher);
    const password = await bcrypt.hash(generatePassword, 10);
    await this.teacherLoginRepo.save({
      teacherId: newTeacher.id,
      password: password,
      passwordTemp: generatePassword,
    });
    return newTeacher;
  }

  public async assignSubject(subjectId: number, teacherId: number) {
    const teacher = await this.teacherRepo.findOneBy({ id: teacherId });
    if (teacher) {
      await this.subjectRepo.update(subjectId, { teacherId: teacherId });
    }
  }

  public async getAllTeachers() {
    const teachers = await this.teacherRepo.find({ relations: ['school'] });
    return { teachers };
  }
}
