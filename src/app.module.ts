import { Module } from '@nestjs/common';
import { DatabaseModule } from './application/adapters/database.module';
import { UsersModule } from './domains/users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
})
export class AppModule {}
