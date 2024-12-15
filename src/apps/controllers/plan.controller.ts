import {
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { Plan } from '../entities/plan.entity';
import { Roles } from '../decorators/role.decorator';
import { PlanService } from '../services/plan.service';
import { JwtAuthGuard } from 'src/shared/webtoken/webtoken.guard';

@Controller('plans')
@UseGuards(JwtAuthGuard)
export class PlanController {
  constructor(private planService: PlanService) {}

  @Get(':id')
  async getPlan(@Param('id') id: string) {
    return await this.planService.getPlan(id);
  }

  @Post('create')
  @Roles('Super Admin')
  async createPlan(@Body() data: Partial<Plan>) {
    return await this.planService.createPlan(data);
  }

  @Delete(':id')
  @Roles('Super Admin')
  async removePlan(@Param('id') id: string) {
    return await this.planService.removePlan(id);
  }

  @Get()
  async getAllPlans() {
    return await this.planService.getAllPlans();
  }

  @Patch(':id')
  @Roles('Super Admin')
  async updatePlan(@Param('id') id: string, @Body() data: Partial<Plan>) {
    return await this.planService.updatePlan(id, data);
  }
}
