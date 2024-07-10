import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ContactoEmergencia } from './contacto-emergencia.entity';
import { CargaFamiliar } from './carga-familiar.entity';

@Entity('relacion')
export class Relacion {
  @PrimaryGeneratedColumn()
  id_relacion: number;

  @Column()
  descripcion: string;
}
