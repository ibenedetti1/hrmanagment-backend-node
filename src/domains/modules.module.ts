import { Module } from '@nestjs/common';

import { CreateUserModule } from './users/create-user/create-user.module';
import { DatabaseModule } from 'src/application/adapters';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule, CreateUserModule],
})
export class ModulesModule {}
