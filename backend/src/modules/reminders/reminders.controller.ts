import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RemindersService } from './reminders.service';
import { CreateReminderDto, UpdateReminderDto } from './reminders.dto';

@UseGuards(JwtAuthGuard)
@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Get('me')
  findAllByUser(@CurrentUser() user: { userId: string }) {
    return this.remindersService.findAllByUser(user.userId);
  }

  @Get()
  findAll(
    @Query('petId', ParseUUIDPipe) petId: string,
    @CurrentUser() user: { userId: string },
  ) {
    return this.remindersService.findAllByPet(petId, user.userId);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: { userId: string },
  ) {
    return this.remindersService.findOne(id, user.userId);
  }

  @Post()
  create(
    @CurrentUser() user: { userId: string },
    @Body() dto: CreateReminderDto,
  ) {
    return this.remindersService.create(user.userId, dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: { userId: string },
    @Body() dto: UpdateReminderDto,
  ) {
    return this.remindersService.update(id, user.userId, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: { userId: string },
  ) {
    return this.remindersService.remove(id, user.userId);
  }

  @Patch(':id/dismiss')
  dismiss(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: { userId: string },
  ) {
    return this.remindersService.dismiss(id, user.userId);
  }

  @Patch(':id/read')
  markRead(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: { userId: string },
  ) {
    return this.remindersService.markRead(id, user.userId);
  }
}
