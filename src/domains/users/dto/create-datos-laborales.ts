import { IsInt, IsDateString } from 'class-validator';

export class CreateDatosLaboralesDto {
  @IsInt()
  id_cargo: number;

  @IsInt()
  id_area: number;

  @IsDateString()
  fecha_ingreso: string;
}
