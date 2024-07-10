import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { CreateUsuarioDto, FilterUsuarioDto, UpdateUsuarioDto } from '../shared';
import { UsersService } from './users.service';

@Controller('usuarios')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usersService.create(createUsuarioDto);
  }

  @Get()
  findAll(@Query() filter: FilterUsuarioDto) {
    return this.usersService.findAll(filter);
  }

  @Get(':rut')
  findOne(@Param('rut') rut: number) {
    return this.usersService.findOne(rut);
  }

  @Put(':rut')
  update(
    @Param('rut') rut: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usersService.update(rut, updateUsuarioDto);
  }

  @Delete(':rut')
  remove(@Param('rut') rut: number) {
    return this.usersService.remove(rut);
  }

  @Delete()
  removeAll() {
    return this.usersService.removeAll();
  }
}
