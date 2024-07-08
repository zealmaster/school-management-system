import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('two_fa_codes')
export class TwoFa extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id',
    type: 'bigint',
  })
  userId: number;

  @Column({
    name: 'two_fa_code',
    type: 'varchar',
  })
  twoFaCode: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'date',
  })
  createdAt: Date;

  // Constructor
  constructor(data: { userId: number; twoFaCode: string }) {
    super();
    if (!data) return;

    this.userId = data.userId;
    this.twoFaCode = data.twoFaCode;
  }
}
