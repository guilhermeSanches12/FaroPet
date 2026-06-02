import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { PushService } from './push.service';
import { SubscribePushDto, UnsubscribePushDto } from './push.dto';

@Controller('push')
@UseGuards(JwtAuthGuard)
export class PushController {
  constructor(private readonly pushService: PushService) {}

  @Get('vapid-public-key')
  getPublicKey() {
    return this.pushService.getPublicKey();
  }

  @Post('subscribe')
  subscribe(
    @CurrentUser() user: { sub: string },
    @Body() dto: SubscribePushDto,
  ) {
    return this.pushService.subscribe(user.sub, dto);
  }

  @Delete('unsubscribe')
  unsubscribe(
    @CurrentUser() user: { sub: string },
    @Body() dto: UnsubscribePushDto,
  ) {
    return this.pushService.unsubscribe(user.sub, dto.endpoint);
  }

  @Post('test')
  sendTest(@CurrentUser() user: { sub: string }) {
    return this.pushService.sendTest(user.sub);
  }

  @Post('process')
  processReminders() {
    return this.pushService.processPendingReminders();
  }
}
