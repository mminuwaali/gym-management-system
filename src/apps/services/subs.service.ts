import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { AuthRepository } from '../repositories/auth.repository';
import { PlanRepository } from '../repositories/plan.repository';
import { SubsriptionRepository } from '../repositories/subs.repository';

@Injectable()
export class SubsriptionService {
  constructor(
    private authRepository: AuthRepository,
    private planRepository: PlanRepository,
    private subscriptionRepository: SubsriptionRepository,
  ) {}

  async getUserSubscriptions(userId: string) {
    return this.subscriptionRepository.findByUser(userId);
  }

  async getUserActiveSubscription(userId: string) {
    return this.subscriptionRepository.findActiveByUser(userId);
  }

  async createSubscription(userId: string, planId: string) {
    const user = await this.authRepository.findById(userId);
    if (!user) throw new BadRequestException('Invalid user');

    const plan = await this.planRepository.findById(planId);
    if (!plan) throw new NotFoundException('Plan not found');

    const active = await this.subscriptionRepository.findActiveByUser(user.id);
    if (active) {
      active.status = 'Expired';
      await this.subscriptionRepository.save(active);
    }

    return await this.subscriptionRepository.save(
      this.subscriptionRepository.create({
        plan,
        user,
        status: 'Active',
        startDate: new Date(),
        endDate: new Date(
          new Date().setDate(new Date().getDate() + plan.duration),
        ),
      }),
    );
  }
}
