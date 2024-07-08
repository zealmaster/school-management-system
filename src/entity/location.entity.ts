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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  location: string;

  @Column()
  state: string;

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
