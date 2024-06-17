import { Type } from 'class-transformer';
import { IsString, IsInt, ValidateNested, IsDateString } from 'class-validator';

export class CreateCargaFamiliarDto {
  @IsString()
  nombre_completo: string;

  @IsInt()
  rut: number;

  @IsString()
  dv: string;

  @IsInt()
  id_sexo: number;

  @IsInt()
  id_relacion: number;
}

export class CreateContactoEmergenciaDto {
  @IsString()
  nombre_completo: string;

  @IsInt()
  id_relacion: number;

  @IsInt()
  telefono: number;
}

export class CreateDatosLaboralesDto {
  @IsInt()
  id_cargo: number;

  @IsInt()
  id_area: number;

  @IsDateString()
  fecha_ingreso: string;
}

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

export class CreateUsuarioDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsInt()
  id_perfil: number;

  @ValidateNested()
  @Type(() => CreateTrabajadorDto)
  trabajador: CreateTrabajadorDto;
}
