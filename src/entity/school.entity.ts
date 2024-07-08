import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Location } from './location.entity';
import { User } from './user.entity';
import { Student } from './student.entity';
import { Teacher } from './teacher.entity';
import { SchoolType } from './school-type.entity';

@Entity('schools')
export class School extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'bigint',
    name: 'user_id',
  })
  userId: number;

  @Column({
    type: 'bigint',
    name: 'location_id',
  })
  locationId: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @CreateDateColumn({
    type: 'date',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'date',
    name: 'updated_At',
  })
  updatedAt: Date;

  @ManyToOne(() => Location, (location) => location.schools)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @ManyToOne(() => User, (user) => user.school)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Student, (student) => student.school)
  students: Student;

  @OneToMany(() => Teacher, (teacher) => teacher.school)
  teacher: Teacher[];

  // @OneToOne(() => SchoolType)
  // schoolType: SchoolType;

  // constructor
  constructor(data: {
    userId: number;
    locationId: number;
    name: string;
    address: string;
  }) {
    super();
    if (!data) return;
    this.userId = data.userId;
    this.locationId = data.locationId;
    this.name = data.name;
    this.address = data.address;
  }
}
