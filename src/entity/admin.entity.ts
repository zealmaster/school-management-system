import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('admins')
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
  })
  id: number;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 100,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 100,
  })
  lastName: string;

  @Column({
    name: 'full_name',
    type: 'varchar',
    length: 200,
  })
  fullName: string;

  @Index('email_unique', { unique: true })
  @Column({
    name: 'email',
    type: 'varchar',
    length: 200,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 100,
  })
  password: string;

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

  // constructor
  constructor(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    super();
    if (!data) return;

    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.password = data.password;
  }
}
