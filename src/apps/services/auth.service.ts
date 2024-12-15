import { User } from '../entities/user.entity';
import * as authUtil from 'src/utilities/auth.util';
import { AuthRepository } from '../repositories/auth.repository';
import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private authRepository:AuthRepository){} 

  async login(data: Pick<User, "email"|"password">){ 
    const user = await this.authRepository.findByEmail(data.email);
    if(!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await authUtil.comparePasswords(data.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');
  
    const payload = { email: user.email, role: user.role };
    return authUtil.generateJwtToken(payload);
  };
  
  async register(data: Partial<User>){ 
    const user = await this.authRepository.findByEmail(data.email);
    if(user) throw new ConflictException('User already exists');

    const isMatch = await authUtil.comparePasswords(data.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');
  };

  private generateToken(payload:Record<"email"|"role", string>) {
    return authUtil.generateJwtToken(payload);
  }
}
