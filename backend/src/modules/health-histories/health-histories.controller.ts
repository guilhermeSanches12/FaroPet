import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { HealthHistoriesService } from './health-histories.service';
import {
  CreateHealthHistoryDto,
  UpdateHealthHistoryDto,
  AddHealthHistoryPhotoDto,
} from './health-histories.dto';

@UseGuards(JwtAuthGuard)
@Controller('health-histories')
export class HealthHistoriesController {
  constructor(private readonly healthHistoriesService: HealthHistoriesService) {}

  @Get()
  findAll(
    @Query('petId', ParseUUIDPipe) petId: string,
    @CurrentUser() user: { userId: string },
  ) {
    return this.healthHistoriesService.findAllByPet(petId, user.userId);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: { userId: string },
  ) {
    return this.healthHistoriesService.findOne(id, user.userId);
  }

  @Post()
  create(
    @CurrentUser() user: { userId: string },
    @Body() dto: CreateHealthHistoryDto,
  ) {
    return this.healthHistoriesService.create(user.userId, dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: { userId: string },
    @Body() dto: UpdateHealthHistoryDto,
  ) {
    return this.healthHistoriesService.update(id, user.userId, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: { userId: string },
  ) {
    return this.healthHistoriesService.remove(id, user.userId);
  }

  @Post(':id/photos')
  addPhoto(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: { userId: string },
    @Body() dto: AddHealthHistoryPhotoDto,
  ) {
    return this.healthHistoriesService.addPhoto(id, user.userId, dto);
  }

  @Delete(':id/photos/:photoId')
  @HttpCode(HttpStatus.OK)
  removePhoto(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('photoId', ParseUUIDPipe) photoId: string,
    @CurrentUser() user: { userId: string },
  ) {
    return this.healthHistoriesService.removePhoto(photoId, id, user.userId);
  }
}
