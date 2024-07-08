import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { School } from './school.entity';

@Entity('locations')
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'varchar',
  })
  location: string;

  @Column({
    type: 'varchar',
  })
  state: string;

  @CreateDateColumn({
    type: 'datetime',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // relations
  @OneToMany(() => School, (school) => school.location)
  schools: School[];

  // constructor
  constructor(data: { location: string; state: string }) {
    super();
    if (!data) return;
    this.location = data.location;
    this.state = data.state;
  }
}
