import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('fees')
export class Fees {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    unsigned: true,
  })
  id: number;

  @Column({
    name: 'school_id',
    type: 'bigint',
  })
  schoolId: number;

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

