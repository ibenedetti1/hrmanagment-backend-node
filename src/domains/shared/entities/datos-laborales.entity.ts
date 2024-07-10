import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cargo } from './cargo.entity';
import { Area } from './area.entity';

@Entity('datos_laborales')
export class DatosLaborales {
  @PrimaryGeneratedColumn()
  id_datos_laborales: number;

  @Column()
  fecha_ingreso: Date;

  @ManyToOne(() => Cargo)
  @JoinColumn({ name: 'id_cargo' })
  cargo: Cargo;

  @ManyToOne(() => Area)
  @JoinColumn({ name: 'id_area' })
  area: Area;
}
