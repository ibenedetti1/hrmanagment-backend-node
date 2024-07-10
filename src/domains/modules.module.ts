import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/application/adapters';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
})
export class ModulesModule {}
