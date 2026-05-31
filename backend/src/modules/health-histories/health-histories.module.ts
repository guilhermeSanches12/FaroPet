import { Module } from '@nestjs/common';
import { HealthHistoriesController } from './health-histories.controller';
import { HealthHistoriesService } from './health-histories.service';
import { PetsModule } from '../pets/pets.module';

@Module({
  imports: [PetsModule],
  controllers: [HealthHistoriesController],
  providers: [HealthHistoriesService],
})
export class HealthHistoriesModule {}
