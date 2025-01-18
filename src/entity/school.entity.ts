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
import { Fees } from './fees.entity';
import { SchoolType } from './school-type.entity';

@Entity('schools')
export class School extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
  })
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

  @Column({
    type: 'bigint',
    name: 'school_type_id',
  })
  schoolTypeId: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  address: string;

  @CreateDateColumn({
    type: 'datetime',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
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

  @OneToMany(() => Fees, (fee) => fee.school)
  fees: Fees[];

  @ManyToOne(() => SchoolType, (schoolType) => schoolType.schools)
  schoolType: SchoolType;

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
