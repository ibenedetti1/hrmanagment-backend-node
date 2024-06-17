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
import { Usuario } from '../shared/entities';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get()
  // findAll(): Promise<Usuario[]> {
  //   return this.usersService.findAll();
  // }

  @Get('rut/:rut')
  findUserByRut(@Param('rut') rut: number): Promise<Usuario> {
    return this.usersService.findUserByRut(rut);
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
