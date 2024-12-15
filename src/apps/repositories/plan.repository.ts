import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Plan } from '../entities/plan.entity';

@Injectable()
export class PlanRepository extends Repository<Plan> {
  async createPlan(data: Partial<Plan>) {
    return await this.save(this.create(data));
  }

  async findById(id: string) {
    return await this.findOneBy({ id, archived: false });
  }

  async updatePlan(id: string, data: Partial<Plan>) {
    return await this.update({ id }, this.create(data));
  }

  async removePlan(id: string) {
    return await this.update({ id }, { archived: true });
  }
}
