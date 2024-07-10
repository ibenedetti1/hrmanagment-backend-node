import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area, CargaFamiliar, Cargo, ContactoEmergencia, DatosLaborales, Perfil, Relacion, Sexo, Trabajador, Usuario } from '../shared';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';


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
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
