import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cargo {
  @PrimaryGeneratedColumn()
  id_cargo: number;

  @Column()
  descripcion: string;
}
