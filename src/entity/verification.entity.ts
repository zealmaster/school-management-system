import { token } from 'src/email/email.service';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('verification_code')
export class Verification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id',
    type: 'bigint',
  })
  userId: number;

  @Column({
    name: 'token',
    type: 'varchar',
  })
  token: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'date',
  })
  createdAt: Date;
}
