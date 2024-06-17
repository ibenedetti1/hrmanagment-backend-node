import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Relacion } from './relacion.entity';

@Entity()
export class ContactoEmergencia {
  @PrimaryGeneratedColumn()
  id_contacto_emergencia: number;

  @Column()
  nombre_completo: string;

  @ManyToOne(() => Relacion)
  @JoinColumn({ name: 'id_relacion' })
  relacion: Relacion;

  @Column()
  telefono: number;
}
