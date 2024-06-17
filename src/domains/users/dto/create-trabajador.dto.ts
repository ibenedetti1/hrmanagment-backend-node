import { IsString, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateContactoEmergenciaDto } from './create-contacto-emergencia.dto';
import { CreateCargaFamiliarDto } from './create-carga-familiar.dto';
import { CreateDatosLaboralesDto } from './create-datos-laborales';

export class CreateTrabajadorDto {
  @IsString()
  nombres: string;

  @IsString()
  apellido_paterno: string;

  @IsString()
  apellido_materno: string;

  @IsInt()
  rut: number;

  @IsString()
  dv: string;

  @IsInt()
  id_sexo: number;

  @IsString()
  direccion: string;

  @IsInt()
  telefono: number;

  @ValidateNested()
  @Type(() => CreateDatosLaboralesDto)
  datosLaborales: CreateDatosLaboralesDto;

  @ValidateNested()
  @Type(() => CreateContactoEmergenciaDto)
  contactoEmergencia: CreateContactoEmergenciaDto;

  @ValidateNested()
  @Type(() => CreateCargaFamiliarDto)
  cargaFamiliar: CreateCargaFamiliarDto;
}
