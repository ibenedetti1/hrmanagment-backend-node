import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Sexo } from './sexo.entity';
import { Relacion } from './relacion.entity';

@Entity()
export class CargaFamiliar {
  @PrimaryGeneratedColumn()
  id_carga_familiar: number;

  @Column()
  nombre_completo: string;

  @Column()
  rut: number;

  @Column()
  dv: string;

  @ManyToOne(() => Sexo)
  @JoinColumn({ name: 'id_sexo' })
  sexo: Sexo;

  @ManyToOne(() => Relacion)
  @JoinColumn({ name: 'id_relacion' })
  relacion: Relacion;
}
