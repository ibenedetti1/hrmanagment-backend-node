import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Usuario } from '../shared';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
