import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentModule } from '../environment/environment.module';
import { EnvironmentService } from '../environment/environment.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentModule],
      useFactory: (environmentService: EnvironmentService) => ({
        type: 'mysql',
        host: environmentService.get('SQL_HOST'),
        port: environmentService.get('SQL_PORT'),
        username: environmentService.get('SQL_USER'),
        password: environmentService.get('SQL_PASSWORD'),
        database: environmentService.get('SQL_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [EnvironmentService],
    }),
  ],
})
export class DatabaseModule {}
