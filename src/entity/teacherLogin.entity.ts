import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('teacher_logins')
export class TeacherLogin extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    unsigned: true,
  })
  id: number;

  @Column({
    name: 'teacher_id',
    type: 'varchar',
  })
  teacherId: number;

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
    constructor(data: { teacherId: number; password: string }) {
      super();
      if (!data) return;
      this.teacherId = data.teacherId;
      this.password = data.password;
    }
  
}
