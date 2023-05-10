import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/entity/teacher.entity';
import { Subject } from 'src/entity/subject.entity';

@Module({
  providers: [TeacherService],
  controllers: [TeacherController],
  imports: [TypeOrmModule.forFeature([Teacher, Subject])],
})
export class TeacherModule {}
