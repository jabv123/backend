import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('matriculas')
export class Matricula {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  periodo: string;

  @Column()
  carrera: string;
}
