import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Perfil, Trabajador, Usuario } from './entities';
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
  ) {}

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({ relations: ['trabajador', 'perfil'] });
  }

  async findOne(id: number): Promise<Usuario> {
    return this.usuarioRepository.findOne({
      where: { user_id: id },
      relations: ['trabajador', 'perfil'],
    });
  }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const trabajador = await this.trabajadorRepository.findOne({
      where: { id_trabajador: createUsuarioDto.id_trabajador },
    });
    const perfil = await this.perfilRepository.findOne({
      where: { id_perfil: createUsuarioDto.id_perfil },
    });

    const usuario = this.usuarioRepository.create({
      username: createUsuarioDto.username,
      password: createUsuarioDto.password,
      trabajador,
      perfil,
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
