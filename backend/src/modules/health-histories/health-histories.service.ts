import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { and, eq, isNull } from 'drizzle-orm';
import { DRIZZLE } from '../../database/drizzle.token';
import { healthHistories, healthHistoryPhotos } from '../../database/schema';
import { PetsService } from '../pets/pets.service';
import {
  CreateHealthHistoryDto,
  UpdateHealthHistoryDto,
  AddHealthHistoryPhotoDto,
} from './health-histories.dto';

type DrizzleDb = any;

@Injectable()
export class HealthHistoriesService {
  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDb,
    private readonly petsService: PetsService,
  ) {}

  async findAllByPet(petId: string, userId: string) {
    await this.petsService.verifyOwnership(petId, userId);

    const records = await this.db.query.healthHistories.findMany({
      where: and(
        eq(healthHistories.petId, petId),
        isNull(healthHistories.deletedAt),
      ),
      with: {
        photos: {
          where: isNull(healthHistoryPhotos.deletedAt),
        },
      },
    });

    return records;
  }

  async findOne(id: string, userId: string) {
    const record = await this.db.query.healthHistories.findFirst({
      where: and(eq(healthHistories.id, id), isNull(healthHistories.deletedAt)),
      with: {
        photos: {
          where: isNull(healthHistoryPhotos.deletedAt),
        },
      },
    });

    if (!record) throw new NotFoundException('Historico nao encontrado.');
    await this.petsService.verifyOwnership(record.petId, userId);

    return record;
  }

  async create(userId: string, dto: CreateHealthHistoryDto) {
    await this.petsService.verifyOwnership(dto.petId, userId);

    const { photos, ...historyData } = dto;

    const [record] = await this.db
      .insert(healthHistories)
      .values({
        ...historyData,
        recordedAt: historyData.recordedAt
          ? new Date(historyData.recordedAt)
          : new Date(),
      })
      .returning();

    if (photos && photos.length > 0) {
      await this.db.insert(healthHistoryPhotos).values(
        photos.map((p) => ({
          healthHistoryId: record.id,
          photoUrl: p.photoUrl,
          caption: p.caption,
          takenAt: p.takenAt ? new Date(p.takenAt) : null,
        })),
      );
    }

    return this.findOne(record.id, userId);
  }

  async update(id: string, userId: string, dto: UpdateHealthHistoryDto) {
    const existing = await this.findOne(id, userId);

    const [updated] = await this.db
      .update(healthHistories)
      .set({
        ...dto,
        recordedAt: dto.recordedAt ? new Date(dto.recordedAt) : undefined,
        updatedAt: new Date(),
      })
      .where(and(eq(healthHistories.id, id), eq(healthHistories.petId, existing.petId)))
      .returning();

    return this.findOne(updated.id, userId);
  }

  async remove(id: string, userId: string) {
    const existing = await this.findOne(id, userId);

    await this.db
      .update(healthHistories)
      .set({ deletedAt: new Date(), updatedAt: new Date() })
      .where(and(eq(healthHistories.id, id), eq(healthHistories.petId, existing.petId)));

    return { message: 'Historico removido com sucesso.' };
  }

  async addPhoto(historyId: string, userId: string, dto: AddHealthHistoryPhotoDto) {
    await this.findOne(historyId, userId);

    const [photo] = await this.db
      .insert(healthHistoryPhotos)
      .values({
        healthHistoryId: historyId,
        photoUrl: dto.photoUrl,
        caption: dto.caption,
        takenAt: dto.takenAt ? new Date(dto.takenAt) : null,
      })
      .returning();

    return photo;
  }

  async removePhoto(photoId: string, historyId: string, userId: string) {
    await this.findOne(historyId, userId);

    await this.db
      .update(healthHistoryPhotos)
      .set({ deletedAt: new Date(), updatedAt: new Date() })
      .where(
        and(
          eq(healthHistoryPhotos.id, photoId),
          eq(healthHistoryPhotos.healthHistoryId, historyId),
        ),
      );

    return { message: 'Foto removida com sucesso.' };
  }
}
