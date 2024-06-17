import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sexo {
  @PrimaryGeneratedColumn()
  id_sexo: number;

  @Column()
  descripcion: string;
}
