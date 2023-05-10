import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { School } from './school.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column({
    name: 'verified_email',
    type: 'tinyint',
  })
  verifiedEmail: number;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'password',
  })
  password: string;

  @CreateDateColumn({
    type: 'date',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'date',
    name: 'updated_at',
  })
  updatedAt: Date;

  @OneToMany(() => School, (school) => school.user)
  school: School[];
}
