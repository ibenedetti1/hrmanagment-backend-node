import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
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
} from './entities';
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
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
