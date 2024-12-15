import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// modules
import { DatabaseModule } from './shared/database/database.module';
import { WebtokenModule } from './shared/webtoken/webtoken.module';

// services
import { AuthService } from './apps/services/auth.service';

// repositoryies
import { AuthRepository } from './apps/repositories/auth.repository';
import { AuthController } from './apps/controllers/auth.controller';

// controllers



@Module({
  imports:[
    DatabaseModule,
    WebtokenModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [
    AuthService,
    AuthRepository,
  ],
  exports:[
    AuthRepository,
  ],
  controllers: [AuthController],
})
export class AppModule {}
