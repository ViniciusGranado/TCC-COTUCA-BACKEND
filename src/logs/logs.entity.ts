import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Log { 
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  text: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  date: string;
}
