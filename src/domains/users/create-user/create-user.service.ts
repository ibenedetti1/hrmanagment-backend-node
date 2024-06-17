import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  Area,
  CargaFamiliar,
  Cargo,
  ContactoEmergencia,
  DatosLaborales,
  Perfil,
  Sexo,
  Trabajador,
  Usuario,
} from '../../shared/entities';
import { CreateUsuarioDto } from './models';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Trabajador)
    private readonly trabajadorRepository: Repository<Trabajador>,
    @InjectRepository(DatosLaborales)
    private readonly datosLaboralesRepository: Repository<DatosLaborales>,
    @InjectRepository(ContactoEmergencia)
    private readonly contactoEmergenciaRepository: Repository<ContactoEmergencia>,
    @InjectRepository(CargaFamiliar)
    private readonly cargaFamiliarRepository: Repository<CargaFamiliar>,
    @InjectRepository(Perfil)
    private readonly perfilRepository: Repository<Perfil>,
    @InjectRepository(Cargo)
    private readonly cargoRepository: Repository<Cargo>,
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
    @InjectRepository(Sexo)
    private readonly sexoRepository: Repository<Sexo>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const perfil = await this.perfilRepository.findOne({
      where: { id_perfil: createUsuarioDto.id_perfil },
    });

    if (!perfil) {
      throw new BadRequestException('Perfil no encontrado');
    }

    const sexoTrabajador = await this.sexoRepository.findOne({
      where: { id_sexo: createUsuarioDto.trabajador.id_sexo },
    });
    if (!sexoTrabajador) {
      throw new BadRequestException('Sexo no encontrado');
    }

    const datosLaborales = this.datosLaboralesRepository.create({
      ...createUsuarioDto.trabajador.datosLaborales,
    });
    const savedDatosLaborales =
      await this.datosLaboralesRepository.save(datosLaborales);

    const contactoEmergencia = this.contactoEmergenciaRepository.create({
      ...createUsuarioDto.trabajador.contactoEmergencia,
    });
    const savedContactoEmergencia =
      await this.contactoEmergenciaRepository.save(contactoEmergencia);

    const cargaFamiliar = this.cargaFamiliarRepository.create({
      ...createUsuarioDto.trabajador.cargaFamiliar,
    });
    const savedCargaFamiliar =
      await this.cargaFamiliarRepository.save(cargaFamiliar);

    const trabajador = this.trabajadorRepository.create({
      ...createUsuarioDto.trabajador,
      sexo: sexoTrabajador,
      datosLaborales: savedDatosLaborales,
      contactoEmergencia: savedContactoEmergencia,
      cargaFamiliar: savedCargaFamiliar,
    });
    const savedTrabajador = await this.trabajadorRepository.save(trabajador);

    const usuario = this.usuarioRepository.create({
      username: createUsuarioDto.username,
      password: createUsuarioDto.password,
      perfil,
      trabajador: savedTrabajador,
    });

    return this.usuarioRepository.save(usuario);
  }
}
