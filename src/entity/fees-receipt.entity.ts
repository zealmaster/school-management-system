import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('fees_receipts')
export class FeesReceipt {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    unsigned: true,
  })
  id: number;

  @Column({
    name: 'student_id',
    type: 'bigint',
  })
  studentId: number;

  @Column({
    name: 'level',
    type: 'varchar',
  })
  level: string;

  @Column({
    name: 'amount',
    type: 'decimal',
  })
  amount: number;

  @Column({
    name: 'transaction_reference',
    type: 'varchar',
  })
  transactionReference: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
  })
  createdAt: Date;
}
