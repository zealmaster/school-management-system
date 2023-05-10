import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('school-type')
export class SchoolType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;
}
