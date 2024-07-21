import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportsController } from './reports.controller';

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
} from '../shared';
import { ReportsService } from './reports.service';
import { UsersService } from '../users';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario,
      Trabajador,
      DatosLaborales,
      ContactoEmergencia,
      CargaFamiliar,
      Sexo,
      Relacion,
      Cargo,
      Area,
      Perfil,
    ]),
  ],
  providers: [ReportsService, UsersService],
  controllers: [ReportsController],
})
export class ReportsModule {}
