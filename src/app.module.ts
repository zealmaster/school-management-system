import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationModule } from './location/location.module';
import { SchoolModule } from './school/school.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { dataSource } from 'ormconfig';
import { AdminModule } from './admin/admin.module';
import { EmailModule } from './email/email.module';
import { FeesModule } from './fees/fees.module';
import { TeacherModule } from './teacher/teacher.module';
import { SubjectModule } from './subject/subject.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    SchoolModule,
    LocationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule.register({ defaultStrategy: 'local', session: true }),
    TypeOrmModule.forRoot(dataSource),
    UserModule,
    AuthModule,
    AdminModule,
    EmailModule,
    FeesModule,
    TeacherModule,
    SubjectModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
