import { Subscription } from './subs.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/shared/database/entities/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  password: string;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: ['Super Admin', 'Gym Owner', 'Instructor', 'Gym User'],
  })
  role: RoleType;

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];
}
