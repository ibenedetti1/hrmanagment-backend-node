import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
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
  CreateUsuarioDto,
  FilterUsuarioDto,
  UpdateUsuarioDto,
} from '../shared';

@Injectable()
export class UsersService {
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
    @InjectRepository(Sexo)
    private readonly sexoRepository: Repository<Sexo>,
    @InjectRepository(Relacion)
    private readonly relacionRepository: Repository<Relacion>,
    @InjectRepository(Cargo)
    private readonly cargoRepository: Repository<Cargo>,
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
    @InjectRepository(Perfil)
    private readonly perfilRepository: Repository<Perfil>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const { password, ...rest } = createUsuarioDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const trabajador = this.trabajadorRepository.create({
      ...createUsuarioDto.trabajador,
      sexo: await this.sexoRepository.findOne({
        where: { id_sexo: createUsuarioDto.trabajador.id_sexo },
      }),
    });

    const datosLaborales = this.datosLaboralesRepository.create({
      ...createUsuarioDto.trabajador.datosLaborales,
      cargo: await this.cargoRepository.findOne({
        where: {
          id_cargo: createUsuarioDto.trabajador.datosLaborales.id_cargo,
        },
      }),
      area: await this.areaRepository.findOne({
        where: { id_area: createUsuarioDto.trabajador.datosLaborales.id_area },
      }),
    });
    trabajador.datosLaborales =
      await this.datosLaboralesRepository.save(datosLaborales);

    const contactoEmergencia = this.contactoEmergenciaRepository.create({
      ...createUsuarioDto.trabajador.contactoEmergencia,
      relacion: await this.relacionRepository.findOne({
        where: {
          id_relacion:
            createUsuarioDto.trabajador.contactoEmergencia.id_relacion,
        },
      }),
    });
    trabajador.contactoEmergencia =
      await this.contactoEmergenciaRepository.save(contactoEmergencia);

    const cargaFamiliar = this.cargaFamiliarRepository.create({
      ...createUsuarioDto.trabajador.cargaFamiliar,
      sexo: await this.sexoRepository.findOne({
        where: { id_sexo: createUsuarioDto.trabajador.cargaFamiliar.id_sexo },
      }),
      relacion: await this.relacionRepository.findOne({
        where: {
          id_relacion: createUsuarioDto.trabajador.cargaFamiliar.id_relacion,
        },
      }),
    });
    trabajador.cargaFamiliar =
      await this.cargaFamiliarRepository.save(cargaFamiliar);
    const savedTrabajador = await this.trabajadorRepository.save(trabajador);

    const usuario = this.usuarioRepository.create({
      ...rest,
      password: hashedPassword,
      trabajador: savedTrabajador,
      perfil: await this.perfilRepository.findOne({
        where: { id_perfil: createUsuarioDto.id_perfil },
      }),
    });
    return this.usuarioRepository.save(usuario);
  }

  async findAll(filter: FilterUsuarioDto): Promise<Usuario[]> {
    const query = this.usuarioRepository
      .createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.trabajador', 'trabajador')
      .leftJoinAndSelect('trabajador.datosLaborales', 'datosLaborales')
      .leftJoinAndSelect('trabajador.contactoEmergencia', 'contactoEmergencia')
      .leftJoinAndSelect('trabajador.cargaFamiliar', 'cargaFamiliar')
      .leftJoinAndSelect('datosLaborales.cargo', 'cargo')
      .leftJoinAndSelect('datosLaborales.area', 'area')
      .leftJoinAndSelect('trabajador.sexo', 'sexo')
      .leftJoinAndSelect('contactoEmergencia.relacion', 'relacionCE')
      .leftJoinAndSelect('cargaFamiliar.sexo', 'sexoCF')
      .leftJoinAndSelect('cargaFamiliar.relacion', 'relacionCF')
      .leftJoinAndSelect('usuario.perfil', 'perfil');

    if (filter.id_sexo) {
      query.andWhere('sexo.id_sexo = :id_sexo', {
        id_sexo: filter.id_sexo,
      });
    }
    if (filter.id_cargo) {
      query.andWhere('cargo.id_cargo = :id_cargo', {
        id_cargo: filter.id_cargo,
      });
    }
    if (filter.id_area) {
      query.andWhere('area.id_area = :id_area', {
        id_area: filter.id_area,
      });
    }

    return query.getMany();
  }

  async findOne(rut: number): Promise<Usuario> {
    return this.usuarioRepository
      .createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.trabajador', 'trabajador')
      .leftJoinAndSelect('trabajador.datosLaborales', 'datosLaborales')
      .leftJoinAndSelect('trabajador.contactoEmergencia', 'contactoEmergencia')
      .leftJoinAndSelect('trabajador.cargaFamiliar', 'cargaFamiliar')
      .leftJoinAndSelect('datosLaborales.cargo', 'cargo')
      .leftJoinAndSelect('datosLaborales.area', 'area')
      .leftJoinAndSelect('trabajador.sexo', 'sexo')
      .leftJoinAndSelect('contactoEmergencia.relacion', 'relacionCE')
      .leftJoinAndSelect('cargaFamiliar.sexo', 'sexoCF')
      .leftJoinAndSelect('cargaFamiliar.relacion', 'relacionCF')
      .leftJoinAndSelect('usuario.perfil', 'perfil')
      .where('trabajador.rut = :rut', { rut })
      .getOne();
  }

  async update(
    rut: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    const usuario = await this.findOne(rut);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    if (updateUsuarioDto.id_perfil) {
      usuario.perfil = await this.perfilRepository.findOne({
        where: { id_perfil: updateUsuarioDto.id_perfil },
      });
    }

    if (updateUsuarioDto.trabajador) {
      const trabajadorDto = updateUsuarioDto.trabajador;

      if (trabajadorDto.id_sexo) {
        usuario.trabajador.sexo = await this.sexoRepository.findOne({
          where: { id_sexo: trabajadorDto.id_sexo },
        });
      }

      if (trabajadorDto.datosLaborales) {
        const datosLaboralesDto = trabajadorDto.datosLaborales;
        const datosLaborales = await this.datosLaboralesRepository.findOne({
          where: {
            id_datos_laborales:
              usuario.trabajador.datosLaborales.id_datos_laborales,
          },
        });
        if (datosLaborales) {
          if (datosLaboralesDto.id_cargo) {
            datosLaborales.cargo = await this.cargoRepository.findOne({
              where: { id_cargo: datosLaboralesDto.id_cargo },
            });
          }
          if (datosLaboralesDto.id_area) {
            datosLaborales.area = await this.areaRepository.findOne({
              where: { id_area: datosLaboralesDto.id_area },
            });
          }
          datosLaborales.fecha_ingreso = datosLaboralesDto.fecha_ingreso;
          await this.datosLaboralesRepository.save(datosLaborales);
        }
      }

      if (trabajadorDto.contactoEmergencia) {
        const contactoEmergenciaDto = trabajadorDto.contactoEmergencia;
        const contactoEmergencia =
          await this.contactoEmergenciaRepository.findOne({
            where: {
              id_contacto_emergencia:
                usuario.trabajador.contactoEmergencia.id_contacto_emergencia,
            },
          });
        if (contactoEmergencia) {
          if (contactoEmergenciaDto.id_relacion) {
            contactoEmergencia.relacion = await this.relacionRepository.findOne(
              { where: { id_relacion: contactoEmergenciaDto.id_relacion } },
            );
          }
          contactoEmergencia.nombre_completo =
            contactoEmergenciaDto.nombre_completo;
          contactoEmergencia.telefono = contactoEmergenciaDto.telefono;
          await this.contactoEmergenciaRepository.save(contactoEmergencia);
        }
      }

      if (trabajadorDto.cargaFamiliar) {
        const cargaFamiliarDto = trabajadorDto.cargaFamiliar;
        const cargaFamiliar = await this.cargaFamiliarRepository.findOne({
          where: {
            id_carga_familiar:
              usuario.trabajador.cargaFamiliar.id_carga_familiar,
          },
        });
        if (cargaFamiliar) {
          if (cargaFamiliarDto.id_sexo) {
            cargaFamiliar.sexo = await this.sexoRepository.findOne({
              where: { id_sexo: cargaFamiliarDto.id_sexo },
            });
          }
          if (cargaFamiliarDto.id_relacion) {
            cargaFamiliar.relacion = await this.relacionRepository.findOne({
              where: { id_relacion: cargaFamiliarDto.id_relacion },
            });
          }
          cargaFamiliar.nombre_completo = cargaFamiliarDto.nombre_completo;
          cargaFamiliar.rut = cargaFamiliarDto.rut;
          cargaFamiliar.dv = cargaFamiliarDto.dv;
          await this.cargaFamiliarRepository.save(cargaFamiliar);
        }
      }

      usuario.trabajador.nombres = trabajadorDto.nombres;
      usuario.trabajador.apellido_paterno = trabajadorDto.apellido_paterno;
      usuario.trabajador.apellido_materno = trabajadorDto.apellido_materno;
      usuario.trabajador.direccion = trabajadorDto.direccion;
      usuario.trabajador.telefono = trabajadorDto.telefono;
      await this.trabajadorRepository.save(usuario.trabajador);
    }

    usuario.username = updateUsuarioDto.username;
    if (updateUsuarioDto.password) {
      usuario.password = await bcrypt.hash(updateUsuarioDto.password, 10);
    }

    await this.usuarioRepository.save(usuario);
    return this.findOne(rut);
  }

  async remove(rut: number): Promise<void> {
    const usuario = await this.findOne(rut);
    if (usuario) {
      await this.usuarioRepository.delete({ user_id: usuario.user_id });
    }
  }

  async removeAll(): Promise<void> {
    await this.usuarioRepository.clear();
  }
}
