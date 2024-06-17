import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
import { CreateUserService } from './create-user.service';
import { CreateUserController } from './create-user.controller';

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
  providers: [CreateUserService],
  controllers: [CreateUserController],
})
export class CreateUserModule {}
