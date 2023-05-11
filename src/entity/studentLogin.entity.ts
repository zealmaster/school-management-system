import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('student_logins')
export class StudentLogin {
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
  studentId: string;

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
    type: 'datetime'
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'login_at',
    type: 'datetime',
  })
  loginAt: Date;
}
