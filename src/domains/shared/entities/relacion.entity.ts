import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Relacion {
  @PrimaryGeneratedColumn()
  id_relacion: number;

  @Column()
  descripcion: string;
}
