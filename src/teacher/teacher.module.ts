import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/entity/teacher.entity';
import { Subject } from 'src/entity/subject.entity';
import { TeacherLogin } from 'src/entity/teacherLogin.entity';

@Module({
  providers: [TeacherService],
  controllers: [TeacherController],
  imports: [TypeOrmModule.forFeature([Teacher, Subject, TeacherLogin])],
})
export class TeacherModule {}
