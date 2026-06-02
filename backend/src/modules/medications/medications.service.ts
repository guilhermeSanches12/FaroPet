import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { and, eq, isNull } from 'drizzle-orm';
import { DRIZZLE } from '../../database/drizzle.token';
import { medications } from '../../database/schema';
import { PetsService } from '../pets/pets.service';
import { CreateMedicationDto, UpdateMedicationDto } from './medications.dto';

type DrizzleDb = any;

@Injectable()
export class MedicationsService {
  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDb,
    private readonly petsService: PetsService,
  ) {}

  async findAllByPet(petId: string, userId: string) {
    await this.petsService.verifyOwnership(petId, userId);
    return this.db.query.medications.findMany({
      where: and(eq(medications.petId, petId), isNull(medications.deletedAt)),
    });
  }

  async findOne(id: string, userId: string) {
    const med = await this.db.query.medications.findFirst({
      where: and(eq(medications.id, id), isNull(medications.deletedAt)),
    });

    if (!med) throw new NotFoundException('Medicamento nao encontrado.');
    await this.petsService.verifyOwnership(med.petId, userId);

    return med;
  }

  async create(userId: string, dto: CreateMedicationDto) {
    await this.petsService.verifyOwnership(dto.petId, userId);

    const [med] = await this.db
      .insert(medications)
      .values({ ...dto, doses: dto.doses ?? [] })
      .returning();

    return med;
  }

  async update(id: string, userId: string, dto: UpdateMedicationDto) {
    const existing = await this.findOne(id, userId);

    const [updated] = await this.db
      .update(medications)
      .set({ ...dto, updatedAt: new Date() })
      .where(and(eq(medications.id, id), eq(medications.petId, existing.petId)))
      .returning();

    return updated;
  }

  async remove(id: string, userId: string) {
    const existing = await this.findOne(id, userId);

    await this.db
      .update(medications)
      .set({ deletedAt: new Date(), updatedAt: new Date() })
      .where(and(eq(medications.id, id), eq(medications.petId, existing.petId)));

    return { message: 'Medicamento removido com sucesso.' };
  }
}
