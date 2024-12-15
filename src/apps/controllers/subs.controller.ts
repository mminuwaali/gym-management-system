import { Roles } from '../decorators/role.decorator';
import { SubsriptionService } from '../services/subs.service';
import { JwtAuthGuard } from 'src/shared/webtoken/webtoken.guard';
import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';

@Roles('Gym User')
@UseGuards(JwtAuthGuard)
@Controller('subscriptions')
export class SubsriptionController {
  constructor(private readonly subscriptionService: SubsriptionService) {}

  @Get()
  async getUserSubscriptions(@Req() req: Request & { user: any }) {
    return this.subscriptionService.getUserSubscriptions(req.user.id);
  }

  @Get('active')
  async getActiveSubscription(@Req() req: Request & { user: any }) {
    return this.subscriptionService.getUserActiveSubscription(req.user.id);
  }

  @Post(':planId')
  async createSubscription(
    @Req() req: Request & { user: any },
    @Param('planId') planId: string,
  ) {
    return this.subscriptionService.createSubscription(req.user.id, planId);
  }
}
