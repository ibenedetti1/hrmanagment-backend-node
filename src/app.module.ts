import { Module } from '@nestjs/common';
import { ModulesModule } from './domains';

@Module({
  imports: [ModulesModule],
})
export class AppModule {}
