import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { School } from './school.entity';

@Entity('teachers')
export class Teacher extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    unsigned: true,
  })
  id: number;

  @Column({
    name: 'school_id',
    type: 'bigint',
  })
  schoolId: number;

  @Column({
    name: 'title',
    type: 'varchar',
  })
  title: string;

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
    name: 'phone',
    type: 'varchar',
  })
  phone: string;

  @Column({
    name: 'date_of_birth',
    type: 'date',
  })
  dateOfBirth: Date;

  @Index('email', { unique: true })
  @Column({
    name: 'email',
    type: 'varchar',
  })
  email: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'varchar',
  })
  updatedAt: Date;

  // relations

  @ManyToOne(() => School, (school) => school.teacher)
  @JoinColumn({ name: 'school_id' })
  school: School;

  // constructor
  constructor(data: {
    schoolId: number;
    title: string;
    firstName: string;
    lastName: string;
    middleName: string;
    dateOfBirth: Date;
    level: string;
    sex: string;
    address: string;
    phone: string;
    email: string;
  }) {
    super();
    if (!data) return;
    this.schoolId = data.schoolId;
    this.title = data.title;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.middleName = data.middleName;
    this.dateOfBirth = data.dateOfBirth;
    this.sex = data.sex;
    this.address = data.address;
    this.email = data.email;
    this.phone = data.phone;
  }
}
