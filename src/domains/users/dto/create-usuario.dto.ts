import { IsString, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTrabajadorDto } from './create-trabajador.dto';

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
