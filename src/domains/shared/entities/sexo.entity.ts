import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Trabajador } from './trabajador.entity';
import { CargaFamiliar } from './carga-familiar.entity';

@Entity('sexo')
export class Sexo {
  @PrimaryGeneratedColumn()
  id_sexo: number;

  @Column()
  descripcion: string;
}
