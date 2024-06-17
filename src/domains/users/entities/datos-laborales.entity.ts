import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cargo } from './cargo.entity';
import { Area } from './area.entity';

@Entity()
export class DatosLaborales {
  @PrimaryGeneratedColumn()
  id_datos_laborales: number;

  @ManyToOne(() => Cargo)
  @JoinColumn({ name: 'id_cargo' })
  cargo: Cargo;

  @ManyToOne(() => Area)
  @JoinColumn({ name: 'id_area' })
  area: Area;

  @Column()
  fecha_ingreso: Date;
}
