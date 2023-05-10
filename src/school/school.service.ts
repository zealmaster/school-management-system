import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddStudentDto } from 'src/dto/addStudent.dto';
import { schoolDto } from 'src/dto/school.dto';
import { UpdateSchoolDto } from 'src/dto/updateSchool.dto';
import { UpdateStudentDto } from 'src/dto/updateStudent.dto';
import { FeesRecord } from 'src/entity/fees-record.entity';
import { School } from 'src/entity/school.entity';
import { Student } from 'src/entity/student.entity';
import { FEES_STATUS, FeesService } from 'src/fees/fees.service';
import { Repository } from 'typeorm';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School)
    private schoolRepository: Repository<School>,
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
    @InjectRepository(FeesRecord)
    private feesRecordRepo: Repository<FeesRecord>,
    @Inject(forwardRef(() => FeesService))
    private feesService: FeesService,
  ) {}

  async fetchSchool() {
    const schools = await this.schoolRepository.find({
      relations: ['location'],
    });
    return schools;
  }
  async schoolById(id) {
    return await this.schoolRepository.findOneBy({ id });
  }

  updateSchool(id, updateDto: UpdateSchoolDto) {
    return this.schoolRepository.update({ id }, { ...updateDto });
  }

  deleteSchool(id) {
    return this.schoolRepository.delete(id);
  }

  addSchool(schoolDto: schoolDto) {
    const newSchool = this.schoolRepository.create(schoolDto);
    return this.schoolRepository.save(newSchool);
  }

  // School admin dashboard
  async addStudent(student: AddStudentDto) {
    const existingStudent = await this.studentRepo.findOneBy({
      studentId: student.studentId,
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
    const feesRecord = {
      schoolId: student.schoolId,
      studentId: newStudent.id,
      totalFees: fees.amount,
      status: FEES_STATUS.default,
      level: newStudent.level,
    };
    console.log(feesRecord);
    await this.feesRecordRepo.save(feesRecord);
    return newStudent;
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
        status: FEES_STATUS.default,
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
    console.log(students);
    return {
      students,
      totalNumber,
    };
  }
}
