import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { School } from './school.entity';

@Entity('locations')
export class Location {
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

  @OneToMany(() => School, (school) => school.location)
  schools: School[];
}
