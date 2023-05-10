import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
  })
  id: number;

  @Column({
    name: 'school_id',
    type: 'bigint',
  })
  schoolId: number;

  @Column({
    name: 'first_name',
    type: 'varchar',
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
  })
  lastName: string;

  @Column({
    name: 'middle_name',
    type: 'varchar',
  })
  middleName: string;

  @Column({
    name: 'date_of_birth',
    type: 'date',
  })
  dateOfBirth: Date;

  @Column({
    name: 'level',
    type: 'varchar',
  })
  level: string;

  @Column({
    name: 'sex',
    type: 'varchar',
  })
  sex: string;

  @Column({
    name: 'address',
    type: 'varchar',
  })
  address: string;

  @Column({
    name: 'parent_name',
    type: 'varchar',
  })
  parentName: string;

  @Column({
    name: 'parent_phone',
    type: 'varchar',
  })
  parentPhone: string;

  @Column({
    name: 'student_id',
    type: 'varchar'
  })
  studentId: string;

  @Column({
    name: 'admission_year',
    type: 'year'
  })
  admissionYear: Date;

  @Column({
    name: 'admission_session',
    type: 'varchar'
  })
  admissionSession: string;

  @Column({
    name: 'graduation_year',
    type: 'year',
  })
  graduationYear: Date;

  @Column({
    name: 'graduation_session',
    type: 'year',
  })
  graduationSession: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime',
  })
  updatedAt: Date;
}
