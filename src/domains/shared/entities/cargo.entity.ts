import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DatosLaborales } from './datos-laborales.entity';

@Entity('cargo')
export class Cargo {
  @PrimaryGeneratedColumn()
  id_cargo: number;

  @Column()
  descripcion: string;
}
