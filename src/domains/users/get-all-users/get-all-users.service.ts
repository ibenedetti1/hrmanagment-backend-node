import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CargaFamiliar,
  ContactoEmergencia,
  DatosLaborales,
  Perfil,
  Sexo,
  Trabajador,
  Usuario,
} from 'src/domains/shared';
import { Repository } from 'typeorm';
@Injectable()
export class GetAllUsersService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Trabajador)
    private readonly trabajadorRepository: Repository<Trabajador>,
    @InjectRepository(Perfil)
    private readonly perfilRepository: Repository<Perfil>,
    @InjectRepository(Sexo)
    private readonly sexoRepository: Repository<Sexo>,
    @InjectRepository(DatosLaborales)
    private readonly datosLaboralesRepository: Repository<DatosLaborales>,
    @InjectRepository(ContactoEmergencia)
    private readonly contactoEmergenciaRepository: Repository<ContactoEmergencia>,
    @InjectRepository(CargaFamiliar)
    private readonly cargaFamiliarRepository: Repository<CargaFamiliar>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      relations: [
        'trabajador',
        'trabajador.sexo',
        'trabajador.datosLaborales',
        'trabajador.datosLaborales.cargo',
        'trabajador.datosLaborales.area',
        'trabajador.contactoEmergencia',
        'trabajador.contactoEmergencia.relacion',
        'trabajador.cargaFamiliar',
        'trabajador.cargaFamiliar.sexo',
        'trabajador.cargaFamiliar.relacion',
        'perfil',
      ],
    });
  }
}
