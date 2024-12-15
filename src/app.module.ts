import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// modules
import { DatabaseModule } from './shared/database/database.module';
import { WebtokenModule } from './shared/webtoken/webtoken.module';

// services
import { AuthService } from './apps/services/auth.service';
import { PlanService } from './apps/services/plan.service';
import { SubsriptionService } from './apps/services/subs.service';

// repositoryies
import { AuthRepository } from './apps/repositories/auth.repository';
import { PlanRepository } from './apps/repositories/plan.repository';
import { SubsriptionRepository } from './apps/repositories/subs.repository';

// controllers
import { AuthController } from './apps/controllers/auth.controller';
import { PlanController } from './apps/controllers/plan.controller';
import { SubsriptionController } from './apps/controllers/subs.controller';

@Module({
  imports: [
    DatabaseModule,
    WebtokenModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  exports: [AuthRepository],
  controllers: [AuthController, PlanController, SubsriptionController],
  providers: [
    AuthService,
    PlanService,
    SubsriptionService,

    AuthRepository,
    PlanRepository,
    SubsriptionRepository,
  ],
})
export class AppModule {}
