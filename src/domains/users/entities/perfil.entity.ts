import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Perfil {
  @PrimaryGeneratedColumn()
  id_perfil: number;

  @Column()
  descripcion: string;
}
