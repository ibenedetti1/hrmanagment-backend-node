import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/application/adapters';
import { UsersModule } from './users';
import { AuthModule } from './auth';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule],
})
export class ModulesModule {}
