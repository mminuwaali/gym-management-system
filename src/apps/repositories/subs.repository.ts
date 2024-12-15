import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Subscription } from '../entities/subs.entity';

@Injectable()
export class SubsriptionRepository extends Repository<Subscription> {
  async findByUser(userId: string): Promise<Subscription[]> {
    return this.find({ where: { user: { id: userId } }, relations: ['plan'] });
  }

  async findActiveByUser(userId: string): Promise<Subscription | undefined> {
    return this.findOne({
      where: { user: { id: userId }, status: 'Active' },
      relations: ['plan'],
    });
  }
}
