import { IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterUsuarioDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id_sexo?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id_cargo?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id_area?: number;
}
