import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/application/adapters';
import { UsersModule } from './users/users.module';
import { GetAllUsersModule } from './users/get-all-users';
import { CreateUserModule } from './users/create-user';

@Module({
  imports: [DatabaseModule, UsersModule, CreateUserModule, GetAllUsersModule],
})
export class ModulesModule {}
