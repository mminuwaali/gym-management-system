import { User } from '../entities/user.entity';
import { Post, Controller } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post("login")
    async login (data:Pick<User, "email"|"password">){
        return await this.authService.login(data);
    }

    @Post("register")
    async register (data:Partial<User>){
        return await this.authService.register(data);
    }
}
