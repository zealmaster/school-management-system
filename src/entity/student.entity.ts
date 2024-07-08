import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { School } from './school.entity';

@Entity('students')
export class Student extends BaseEntity {
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
    name: 'student_indentification_number',
    type: 'varchar',
  })
  studentIdentificationNumber: string;

  @Column({
    name: 'admission_year',
    type: 'year',
  })
  admissionYear: Date;

  @Column({
    name: 'admission_session',
    type: 'varchar',
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
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // Relations

  @OneToOne(() => School, (school) => school.students)
  @JoinColumn({ name: 'school_id' })
  school: School;

  // constructor
  constructor(data: {
    schoolId: number;
    firstName: string;
    lastName: string;
    middleName: string;
    dateOfBirth: Date;
    level: string;
    sex: string;
    address: string;
    parentName: string;
    parentPhone: string;
    studentIdentificationNumber: string;
    admissionYear: Date;
    admissionSession: string;
    graduationYear: Date;
    graduationSession: string;
  }) {
    super();
    if (!data) return;
    this.schoolId = data.schoolId;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.middleName = data.middleName;
    this.dateOfBirth = data.dateOfBirth;
    this.level = data.level;
    this.sex = data.sex;
    this.address = data.address;
    this.parentName = data.parentName;
    this.parentPhone = data.parentPhone;
    this.studentIdentificationNumber = data.studentIdentificationNumber;
    this.admissionYear = data.admissionYear;
    this.admissionSession = data.admissionSession;
    this.graduationYear = data.graduationYear;
    this.graduationSession = data.graduationSession;
  }
}
