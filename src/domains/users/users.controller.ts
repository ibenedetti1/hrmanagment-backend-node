import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Usuario } from './entities';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<Usuario[]> {
    return this.usersService.findAll();
  }

  @Get('rut/:rut')
  findUserByRut(@Param('rut') rut: number): Promise<Usuario> {
    return this.usersService.findUserByRut(rut);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  // async create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
  //   return this.usersService.create(createUsuarioDto);
  // }
  async create(
    @Body() createUsuarioDto: CreateUsuarioDto,
  ): Promise<{ message: string; data: any }> {
    const usuario = await this.usersService.create(createUsuarioDto);
    const responseData = {
      nombre: usuario.trabajador.nombres,
      apellido_paterno: usuario.trabajador.apellido_paterno,
      apellido_materno: usuario.trabajador.apellido_materno,
      rut: usuario.trabajador.rut,
      dv: usuario.trabajador.dv,
    };
    return { message: 'Usuario creado exitosamente', data: responseData };
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateUsuarioDto: Partial<CreateUsuarioDto>,
  ): Promise<Usuario> {
    return this.usersService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
