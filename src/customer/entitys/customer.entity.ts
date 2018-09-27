import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('varchar', { length: 50 })
  tel: string;

  @Column('varchar', { length: 100 })
  company: string;

  @Column({ type: 'int' })
  views: number;

  @Column({ type: 'tinyint' })
  isPublished: number;
}
