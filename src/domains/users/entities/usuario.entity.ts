import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Perfil } from './perfil.entity';
import { Trabajador } from './trabajador.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToOne(() => Perfil)
  @JoinColumn({ name: 'id_perfil' })
  perfil: Perfil;

  @ManyToOne(() => Trabajador)
  @JoinColumn({ name: 'id_trabajador' })
  trabajador: Trabajador;
}
