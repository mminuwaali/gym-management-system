import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthRepository extends Repository<User> {
  async findById(id: string) {
    return await this.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return await this.findOneBy({ email });
  }

  async getUserByRole(role: RoleType) {
    return await this.findOneBy({ role });
  }

  async createUser(data: Partial<User>) {
    return await this.save(this.create(data));
  }

  async updateUserProfile(id: string, data: Partial<User>) {
    return await this.update({ id }, this.create(data));
  }

  async changePassword(id: string, password: string) {
    return await this.update({ id }, this.create({ password }));
  }
}
