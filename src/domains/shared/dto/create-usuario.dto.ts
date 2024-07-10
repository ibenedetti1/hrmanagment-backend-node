import { IsString, IsInt, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class DatosLaboralesDto {
  @IsInt()
  id_cargo: number;

  @IsInt()
  id_area: number;

  @IsNotEmpty()
  @Type(() => Date)
  fecha_ingreso: Date;
}

class ContactoEmergenciaDto {
  @IsString()
  nombre_completo: string;

  @IsInt()
  id_relacion: number;

  @IsInt()
  telefono: number;
}

class CargaFamiliarDto {
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

class TrabajadorDto {
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
  @Type(() => DatosLaboralesDto)
  datosLaborales: DatosLaboralesDto;

  @ValidateNested()
  @Type(() => ContactoEmergenciaDto)
  contactoEmergencia: ContactoEmergenciaDto;

  @ValidateNested()
  @Type(() => CargaFamiliarDto)
  cargaFamiliar: CargaFamiliarDto;
}

export class CreateUsuarioDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsInt()
  id_perfil: number;

  @ValidateNested()
  @Type(() => TrabajadorDto)
  trabajador: TrabajadorDto;
}
