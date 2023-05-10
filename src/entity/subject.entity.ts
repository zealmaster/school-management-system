import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('subjects')
export class Subject {
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
    name: 'schoolId',
    type: 'bigint',
  })
  schoolId: number;

  @Column({
    name: 'teacherId',
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
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'varchar',
  })
  updatedAt: Date;
}
