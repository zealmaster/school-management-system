import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('subjects')
export class Subject extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    unsigned: true,
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
  })
  name: string;

  @Column({
    name: 'level',
    type: 'varchar',
  })
  level: string;

  @Column({
    name: 'school_id',
    type: 'bigint',
  })
  schoolId: number;

  @Column({
    name: 'teacher_id',
    type: 'bigint',
  })
  teacherId: number;

  @Column({
    name: 'session',
    type: 'varchar',
  })
  session: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'varchar',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // constructor
  constructor(data: {
    schoolId: number;
    name: string;
    level: string;
    teacherId: number;
    session: string;
  }) {
    super();
    if (!data) return;
    this.schoolId = data.schoolId;
    this.level = data.level;
    this.teacherId = data.teacherId;
    this.session = data.session;
  }
}
