import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('student_logins')
export class StudentLogin extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    unsigned: true,
  })
  id: number;

  @Column({
    name: 'student_id',
    type: 'varchar',
  })
  studentId: number;

  @Column({
    name: 'password',
    type: 'varchar',
  })
  password: string;

  @Column({
    name: 'password_temp',
    type: 'varchar',
  })
  passwordTemp: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'login_at',
    type: 'datetime',
  })
  loginAt: Date;

  // constructor
  constructor(data: { studentId: number; password: string }) {
    super();
    if (!data) return;
    this.studentId = data.studentId;
    this.password = data.password;
  }
}
