import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('perfil')
export class Perfil {
  @PrimaryGeneratedColumn()
  id_perfil: number;

  @Column()
  descripcion: string;
}
