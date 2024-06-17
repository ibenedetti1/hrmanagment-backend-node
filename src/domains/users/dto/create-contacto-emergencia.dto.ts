import { IsString, IsInt } from 'class-validator';

export class CreateContactoEmergenciaDto {
  @IsString()
  nombre_completo: string;

  @IsInt()
  id_relacion: number;

  @IsInt()
  telefono: number;
}
