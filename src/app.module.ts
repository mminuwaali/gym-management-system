import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// modules
import { DatabaseModule } from './shared/database/database.module';
import { WebtokenModule } from './shared/webtoken/webtoken.module';

// services
import { AuthService } from './apps/services/auth.service';

// repositoryies
import { AuthRepository } from './apps/repositories/auth.repository';

// controllers
import { AuthController } from './apps/controllers/auth.controller';

@Module({
  imports: [
    DatabaseModule,
    WebtokenModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  exports: [AuthRepository],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AppModule {}
