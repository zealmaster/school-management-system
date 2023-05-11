import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Location } from './location.entity';
import { User } from './user.entity';
import { Student } from './student.entity';

@Entity('schools')
export class School {
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

  @OneToMany(() => Student, (student) => student.school)
  students: Student;
}
