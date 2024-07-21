import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/application/adapters';
import { UsersModule } from './users';
import { AuthModule } from './auth';
import { ReportsModule } from './reports';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, ReportsModule],
})
export class ModulesModule {}
