import { IsString, IsInt } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsInt()
  id_perfil: number;

  @IsInt()
  id_trabajador: number;
}
