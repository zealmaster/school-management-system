import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('fees_records')
export class FeesRecord {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
  })
  id: number;

  @Column({
    name: 'student_id',
    type: 'bigint',
  })
  studentId: number;

  @Column({
    name: 'school_id',
    type: 'bigint',
  })
  schoolId: number;

  @Column({
    name: 'total_fees',
    type: 'decimal',
  })
  totalFees: number;

  @Column({
    name: 'level',
    type: 'varchar',
  })
  level: string;

  @Column({
    name: 'amount_paid',
    type: 'decimal',
  })
  amountPaid: number;

  @Column({
    name: 'balance',
    type: 'decimal',
  })
  balance: number;

  @Column({
    name: 'status',
    type: 'tinyint',
  })
  status: number;

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
    type: 'datetime',
  })
  updatedAt: Date;
}
