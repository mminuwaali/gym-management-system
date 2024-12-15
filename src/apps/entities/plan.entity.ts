import { Subscription } from './subs.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/shared/database/entities/base.entity';

@Entity('plans')
export class Plan extends BaseEntity {
  @Column('int')
  duration: number;

  @Column({ unique: true })
  name: string;

  @Column('boolean', { default: false })
  archived: boolean;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => Subscription, (subscription) => subscription.plan)
  subscriptions: Subscription[];
}
