import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CargaFamiliar,
  ContactoEmergencia,
  DatosLaborales,
  Perfil,
  Sexo,
  Trabajador,
  Usuario,
} from './entities';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsersService {
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
    return this.usuarioRepository.find({ relations: ['trabajador', 'perfil'] });
  }

  async findUserByRut(rut: number): Promise<Usuario> {
    const trabajador = await this.trabajadorRepository.findOne({
      where: { rut },
      relations: [
        'sexo',
        'datosLaborales',
        'datosLaborales.cargo',
        'datosLaborales.area',
        'contactoEmergencia',
        'contactoEmergencia.relacion',
        'cargaFamiliar',
        'cargaFamiliar.sexo',
        'cargaFamiliar.relacion',
      ],
    });

    if (!trabajador) {
      throw new NotFoundException(`Trabajador con RUT ${rut} no encontrado`);
    }

    const usuario = await this.usuarioRepository.findOne({
      where: { trabajador },
      relations: [
        'perfil',
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
      ],
    });

    if (!usuario) {
      throw new NotFoundException(
        `Usuario con trabajador de RUT ${rut} no encontrado`,
      );
    }

    return usuario;
  }

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

  async update(
    id: number,
    updateUsuarioDto: Partial<CreateUsuarioDto>,
  ): Promise<Usuario> {
    await this.usuarioRepository.update(id, updateUsuarioDto);
    return this.usuarioRepository.findOne({
      where: { user_id: id },
      relations: ['trabajador', 'perfil'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}
