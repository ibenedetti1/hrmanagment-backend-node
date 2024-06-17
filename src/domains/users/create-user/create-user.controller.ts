import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { CreateUserService } from './create-user.service';
import { CreateUsuarioDto, ICreateUserResponse } from './models';

@Controller('users')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() createUsuarioDto: CreateUsuarioDto,
  ): Promise<ICreateUserResponse> {
    const usuario = await this.createUserService.create(createUsuarioDto);
    const responseData = {
      nombre: usuario.trabajador.nombres,
      apellido_paterno: usuario.trabajador.apellido_paterno,
      apellido_materno: usuario.trabajador.apellido_materno,
      rut: usuario.trabajador.rut,
      dv: usuario.trabajador.dv,
    };
    return { message: 'Usuario creado exitosamente', data: responseData };
  }
}
