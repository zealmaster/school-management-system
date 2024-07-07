import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SchoolDto } from 'src/school/dto/school.dto';
import { UpdateSchoolDto } from 'src/school/dto/updateSchool.dto';
import { School } from 'src/entity/school.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School)
    private schoolRepository: Repository<School>,
  ) {}

  async fetchSchool() {
    const schools = await this.schoolRepository.find({
      relations: ['location', 'user'],
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

  addSchool(schoolDto: SchoolDto) {
    const newSchool = this.schoolRepository.create(schoolDto);
    return this.schoolRepository.save(newSchool);
  }

}
