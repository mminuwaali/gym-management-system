import { Module } from '@nestjs/common';
import { DatabaseModule } from './shared/database/database.module';
import { WebtokenModule } from './shared/webtoken/webtoken.module';

@Module()
export class AppModule {}
