import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { LoginCredentialsDto, Usuario } from '../shared';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async validateUser(
    loginCredentialsDto: LoginCredentialsDto,
  ): Promise<Usuario> {
    const { username, password } = loginCredentialsDto;
    const user = await this.usuarioRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    } else {
      throw new UnauthorizedException('Credenciales inválidas');
    }
  }
}
