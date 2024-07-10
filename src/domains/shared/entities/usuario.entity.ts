import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Perfil } from './perfil.entity';
import { Trabajador } from './trabajador.entity';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToOne(() => Perfil, { eager: true })
  @JoinColumn({ name: 'id_perfil' })
  perfil: Perfil;

  @ManyToOne(() => Trabajador, { cascade: true, eager: true })
  @JoinColumn({ name: 'id_trabajador' })
  trabajador: Trabajador;
}
