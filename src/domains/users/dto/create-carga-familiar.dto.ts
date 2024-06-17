import { IsString, IsInt } from 'class-validator';

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
