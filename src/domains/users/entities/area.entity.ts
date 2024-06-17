import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Area {
  @PrimaryGeneratedColumn()
  id_area: number;

  @Column()
  descripcion: string;
}
