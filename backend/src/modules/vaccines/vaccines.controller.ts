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
import { VaccinesService } from './vaccines.service';
import { CreateVaccineDto, UpdateVaccineDto } from './vaccines.dto';

@UseGuards(JwtAuthGuard)
@Controller('vaccines')
export class VaccinesController {
  constructor(private readonly vaccinesService: VaccinesService) {}

  @Get()
  findAll(
    @Query('petId', ParseUUIDPipe) petId: string,
    @CurrentUser() user: { userId: string },
  ) {
    return this.vaccinesService.findAllByPet(petId, user.userId);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: { userId: string },
  ) {
    return this.vaccinesService.findOne(id, user.userId);
  }

  @Post()
  create(
    @CurrentUser() user: { userId: string },
    @Body() dto: CreateVaccineDto,
  ) {
    return this.vaccinesService.create(user.userId, dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: { userId: string },
    @Body() dto: UpdateVaccineDto,
  ) {
    return this.vaccinesService.update(id, user.userId, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: { userId: string },
  ) {
    return this.vaccinesService.remove(id, user.userId);
  }
}
