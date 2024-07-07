import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationModule } from './modules/location/location.module';
import { SchoolModule } from './modules/school/school.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { dataSource } from 'ormconfig';
import { AdminModule } from './modules/admin/admin.module';
import { EmailModule } from './modules/email/email.module';
import { FeesModule } from './modules/fees/fees.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { SubjectModule } from './modules/subject/subject.module';
import { StudentModule } from './modules/student/student.module';
import { PaymentModule } from './modules/payment/payment.module';


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
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
