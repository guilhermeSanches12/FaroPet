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
import { AdoptionsService } from './adoptions.service';
import { CreateAdoptionDto, UpdateAdoptionDto, UpdateAdoptionStatusDto } from './adoptions.dto';

@UseGuards(JwtAuthGuard)
@Controller('adoptions')
export class AdoptionsController {
  constructor(private readonly adoptionsService: AdoptionsService) {}

  @Get()
  findAll(
    @Query('animalType') animalType?: string,
    @Query('state') state?: string,
    @Query('city') city?: string,
  ) {
    return this.adoptionsService.findAll({ animalType, state, city });
  }

  @Get('mine')
  findMine(@CurrentUser() user: { userId: string }) {
    return this.adoptionsService.findMine(user.userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.adoptionsService.findOne(id);
  }

  @Post()
  create(
    @CurrentUser() user: { userId: string },
    @Body() dto: CreateAdoptionDto,
  ) {
    return this.adoptionsService.create(user.userId, dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: { userId: string },
    @Body() dto: UpdateAdoptionDto,
  ) {
    return this.adoptionsService.update(id, user.userId, dto);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: { userId: string },
    @Body() dto: UpdateAdoptionStatusDto,
  ) {
    return this.adoptionsService.updateStatus(id, user.userId, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: { userId: string },
  ) {
    return this.adoptionsService.remove(id, user.userId);
  }
}
