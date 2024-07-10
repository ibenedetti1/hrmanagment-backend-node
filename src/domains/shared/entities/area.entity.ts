import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DatosLaborales } from './datos-laborales.entity';

@Entity('area')
export class Area {
  @PrimaryGeneratedColumn()
  id_area: number;

  @Column()
  descripcion: string;
}
