import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Student } from './student.entity';
import { School } from './school.entity';

export const FEES_STATUS = {
  OWING: 0,
  PART_PAYMENT: 1,
  COMPLETE: 2,
};

@Entity('fees_records')
export class FeesRecord extends BaseEntity {
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
    default: FEES_STATUS.OWING,
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
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // relations
  @ManyToOne(() => Student, (student) => student.feesRecord)
  student: Student;

  @OneToOne(() => School)
  @JoinColumn({name: 'school_id'})
  school: School;
  
  // constructor
  constructor(data: {
    studentId: number;
    schoolId: number;
    level: string;
    totalFees: number;
    amountPaid: number;
    balance: number;
    session: string;
  }) {
    super();
    if (!data) return;
    this.studentId = data.studentId;
    this.schoolId = data.schoolId;
    this.totalFees = data.totalFees;
    this.level = data.level;
    this.amountPaid = data.amountPaid;
    this.balance = data.balance;
    this.session = data.session;
  }
}
