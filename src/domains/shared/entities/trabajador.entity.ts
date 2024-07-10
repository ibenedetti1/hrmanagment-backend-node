import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Sexo } from './sexo.entity';
import { DatosLaborales } from './datos-laborales.entity';
import { ContactoEmergencia } from './contacto-emergencia.entity';
import { CargaFamiliar } from './carga-familiar.entity';

@Entity('trabajador')
export class Trabajador {
  @PrimaryGeneratedColumn()
  id_trabajador: number;

  @Column()
  nombres: string;

  @Column()
  apellido_paterno: string;

  @Column()
  apellido_materno: string;

  @Column()
  rut: number;

  @Column()
  dv: string;

  @Column()
  direccion: string;

  @Column()
  telefono: number;

  @ManyToOne(() => Sexo)
  @JoinColumn({ name: 'id_sexo' })
  sexo: Sexo;

  @ManyToOne(() => DatosLaborales, { eager: true })
  @JoinColumn({ name: 'id_datos_laborales' })
  datosLaborales: DatosLaborales;

  @ManyToOne(() => ContactoEmergencia, { eager: true })
  @JoinColumn({ name: 'id_contacto_emergencia' })
  contactoEmergencia: ContactoEmergencia;

  @ManyToOne(() => CargaFamiliar, { eager: true })
  @JoinColumn({ name: 'id_carga_familiar' })
  cargaFamiliar: CargaFamiliar;
}
