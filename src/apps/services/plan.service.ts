import { Injectable } from '@nestjs/common';
import { PlanRepository } from '../repositories/plan.repository';
import { Plan } from '../entities/plan.entity';

@Injectable()
export class PlanService {
  constructor(private planRepository: PlanRepository) {}

  async getPlan(id: string) {
    return await this.planRepository.findById(id);
  }

  async createPlan(data: Partial<Plan>) {
    return await this.planRepository.createPlan(data);
  }

  async removePlan(id: string) {
    return await this.planRepository.removePlan(id);
  }

  async updatePlan(id: string, data: Partial<Plan>) {
    return await this.planRepository.updatePlan(id, data);
  }

  async getAllPlans() {
    return await this.planRepository.findBy({ archived: false });
  }
}
