import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddStudentDto } from 'src/modules/student/dto/addStudent.dto';
import { StudentLoginDto } from './dto/studentLoginDto';
import { UpdateStudentDto } from 'src/modules/student/dto/updateStudent.dto';
import { FEES_STATUS, FeesRecord } from 'src/entity/fees-record.entity';
import { Student } from 'src/entity/student.entity';
import { StudentLogin } from 'src/entity/studentLogin.entity';
import { FeesService } from 'src/modules/fees/fees.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { generatePassword } from 'src/strings';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
    @InjectRepository(FeesRecord)
    private feesRecordRepo: Repository<FeesRecord>,
    @InjectRepository(StudentLogin)
    private studentLoginRepo: Repository<StudentLogin>,
    private feesService: FeesService,
  ) {}

  // School admin dashboard
  async addStudent(student: AddStudentDto) {
    const existingStudent = await this.studentRepo.findOneBy({
      id: student.studentId,
      schoolId: student.schoolId,
    });
    if (existingStudent) {
      return `student's record, student ID: ${student.studentId}, exists`;
    }
    const newStudent = await this.studentRepo.save(student);
    const fees = await this.feesService.getFeesByLevel(
      student.level,
      student.schoolId,
    );
    const password = await bcrypt.hash(generatePassword, 10);
    const studentLogin = await this.studentLoginRepo.save({
      // studentId: student.studentId,
      password: password,
      passwordTemp: generatePassword,
    });
    const feesRecord = {
      schoolId: student.schoolId,
      studentId: newStudent.id,
      totalFees: fees.amount,
      level: newStudent.level,
    };
    await this.feesRecordRepo.save(feesRecord);
    return { newStudent, studentLogin };
  }

  async updateStudent(id: number, student: UpdateStudentDto) {
    const existingStudent = await this.studentRepo.findOneBy({ id });
    if (student.level !== existingStudent.level) {
      const newStudent = await this.studentRepo.save(student);
      const fees = await this.feesService.getFeesByLevel(
        student.level,
        existingStudent.schoolId,
      );
      const feesRecord = {
        schoolId: existingStudent.schoolId,
        studentId: newStudent.id,
        totalFees: fees.amount,
        level: student.level,
      };
      await this.feesRecordRepo.save(feesRecord);
      return newStudent;
    }
    await this.studentRepo.update(id, student);
  }

  async removeStudent(id: number) {
    await this.studentRepo.delete(id);
    return "Student's record removed from database";
  }

  async getAllStudents() {
    const students = await this.studentRepo.find({ relations: ['school'] });
    const totalNumber = await this.studentRepo.count();
    return {
      students,
      totalNumber,
    };
  }

  //student actions
  public async loginStudent(login: StudentLoginDto) {
    const student = await this.studentLoginRepo.findOneBy({
      studentId: login.studentId,
    });
    if (student && (await bcrypt.compare(login.password, student.password))) {
      await this.studentLoginRepo.update(student.id, {
        loginAt: new Date().toISOString(),
      });
      return 'login successful';
    } else if (student && login.password === student.passwordTemp) {
      await this.studentLoginRepo.update(student.id, {
        loginAt: new Date().toISOString(),
      });
      return 'login successful';
    } else
      return new HttpException(
        'Wrong student login credentials',
        HttpStatus.BAD_REQUEST,
      );
  }
}
