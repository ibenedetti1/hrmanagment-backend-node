import { Controller, Get } from '@nestjs/common';

import { GetAllUsersService } from './get-all-users.service';
import { Usuario } from 'src/domains/shared';

@Controller('users')
export class GetAllUsersController {
  constructor(private readonly getAllUsersService: GetAllUsersService) {}

  @Get()
  findAll(): Promise<Usuario[]> {
    return this.getAllUsersService.findAll();
  }
}
