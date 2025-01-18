import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddTeacherDto } from 'src/modules/teacher/dto/addTeacher.dto';
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

  public async addTeacher(data: AddTeacherDto) {
    try {
      const { email, phone } = data;
      const addedTeacher = await this.teacherRepo.findOneBy({
        email,
        phone,
      });
      if (addedTeacher) return 'Teacher already added';
      const newTeacher = await this.teacherRepo.save(data);
      const password = await bcrypt.hash(generatePassword, 10);
      await this.teacherLoginRepo.save({
        teacherId: newTeacher.id,
        password: password,
        passwordTemp: generatePassword,
      });
      return newTeacher;
    } catch (error) {
      console.log(error);
    }
  }

  public async assignSubject(subjectId: number, teacherId: number) {
    try {
      const teacher = await this.teacherRepo.findOneBy({ id: teacherId });
      if (teacher) {
        await this.subjectRepo.update(subjectId, { teacherId: teacherId });
      }
      return { success: true, message: 'subject assigned successfully' };
    } catch (error) {
      console.log(error);
    }
  }

  public async getAllTeachers() {
    try {
      const teachers = await this.teacherRepo.find({ relations: ['school'] });
      return { teachers };
    } catch (error) {
      console.log(error);
    }
  }
}
