import { User } from '../entities/user.entity';
import { AuthService } from '../services/auth.service';
import { Get, Post, Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/webtoken/webtoken.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async user() {
    return await this.authService.getCurrentUser('');
  }

  @Post('login')
  async login(data: Pick<User, 'email' | 'password'>) {
    return await this.authService.login(data);
  }

  @Post('register')
  async register(data: Partial<User>) {
    return await this.authService.register(data);
  }
}
