import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Relacion } from './relacion.entity';

@Entity('contacto_emergencia')
export class ContactoEmergencia {
  @PrimaryGeneratedColumn()
  id_contacto_emergencia: number;

  @Column()
  nombre_completo: string;

  @Column()
  telefono: number;

  @ManyToOne(() => Relacion)
  @JoinColumn({ name: 'id_relacion' })
  relacion: Relacion;
}
