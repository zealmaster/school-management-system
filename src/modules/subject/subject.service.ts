import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddSubjectDto } from './dto/addSubject.dto';
import { UpdateSubjectDto } from './dto/updateSubject.dto';
import { Subject } from 'src/entity/subject.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepo: Repository<Subject>,
  ) {}

  public async addSubject(data: AddSubjectDto) {
    try {
      const { name, level } = data;
      const existingSubject = await this.subjectRepo.findOneBy({
        name,
        level,
      });
      if (existingSubject) {
        return { success: false, message: 'Subject already added' };
      }
      const subject = await this.subjectRepo.save(data);
      return { success: true, message: 'subject added successfully', subject };
    } catch (error) {
      console.log(error);
    }
  }

  public async updateSubject(
    id: number,
    subject: UpdateSubjectDto,
  ): Promise<string | any> {
    try {
      await this.subjectRepo.update(id, subject);
      return { success: true, message: 'Updated successfully' };
    } catch (error) {
      console.log(error);
    }
  }

  public async getAllSubject() {
    try {
      return await this.subjectRepo.find();
    } catch (error) {
      console.log(error);
    }
  }
}
