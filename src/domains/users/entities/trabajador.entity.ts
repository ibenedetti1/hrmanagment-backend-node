import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CargaFamiliar } from './carga-familiar.entity';
import { ContactoEmergencia } from './contacto-emergencia.entity';
import { DatosLaborales } from './datos-laborales.entity';
import { Sexo } from './sexo.entity';

@Entity()
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

  @ManyToOne(() => Sexo)
  @JoinColumn({ name: 'id_sexo' })
  sexo: Sexo;

  @Column()
  direccion: string;

  @Column()
  telefono: number;

  @ManyToOne(() => DatosLaborales)
  @JoinColumn({ name: 'id_datos_laborales' })
  datosLaborales: DatosLaborales;

  @ManyToOne(() => ContactoEmergencia)
  @JoinColumn({ name: 'id_contacto_emergencia' })
  contactoEmergencia: ContactoEmergencia;

  @ManyToOne(() => CargaFamiliar)
  @JoinColumn({ name: 'id_carga_familiar' })
  cargaFamiliar: CargaFamiliar;
}
