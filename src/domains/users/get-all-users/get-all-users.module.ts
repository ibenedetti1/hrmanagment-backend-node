import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GetAllUsersService } from './get-all-users.service';
import {
  Area,
  CargaFamiliar,
  Cargo,
  ContactoEmergencia,
  DatosLaborales,
  Perfil,
  Relacion,
  Sexo,
  Trabajador,
  Usuario,
} from 'src/domains/shared';
import { GetAllUsersController } from './get-all-users.controller';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario,
      Trabajador,
      Perfil,
      Sexo,
      DatosLaborales,
      Cargo,
      Area,
      CargaFamiliar,
      ContactoEmergencia,
      Relacion,
    ]),
  ],
  providers: [GetAllUsersService],
  controllers: [GetAllUsersController],
})
export class GetAllUsersModule {}
