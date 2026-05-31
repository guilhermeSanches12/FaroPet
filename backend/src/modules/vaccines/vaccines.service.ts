import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { and, eq, isNull } from 'drizzle-orm';
import { DRIZZLE } from '../../database/drizzle.token';
import { vaccines, type Vaccine } from '../../database/schema';
import { PetsService } from '../pets/pets.service';
import { CreateVaccineDto, UpdateVaccineDto } from './vaccines.dto';

type DrizzleDb = any;
type VaccineStatus = 'taken' | 'scheduled' | 'overdue' | 'pending';

@Injectable()
export class VaccinesService {
  private readonly logger = new Logger(VaccinesService.name);

  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDb,
    private readonly petsService: PetsService,
  ) {}

  async findAllByPet(petId: string, userId: string) {
    await this.petsService.verifyOwnership(petId, userId);
    const rows = await this.db.query.vaccines.findMany({
      where: and(eq(vaccines.petId, petId), isNull(vaccines.deletedAt)),
    });
    return rows.map((v: Vaccine) => ({ ...v, status: this.computeStatus(v) }));
  }

  async findOne(id: string, userId: string) {
    const vaccine = await this.db.query.vaccines.findFirst({
      where: and(eq(vaccines.id, id), isNull(vaccines.deletedAt)),
    });

    if (!vaccine) throw new NotFoundException('Vacina nao encontrada.');
    await this.petsService.verifyOwnership(vaccine.petId, userId);

    return { ...vaccine, status: this.computeStatus(vaccine) };
  }

  async create(userId: string, dto: CreateVaccineDto) {
    this.logger.log({ msg: 'create vaccine', dto });
    await this.petsService.verifyOwnership(dto.petId, userId);

    const [vaccine] = await this.db
      .insert(vaccines)
      .values(dto)
      .returning();

    return { ...vaccine, status: this.computeStatus(vaccine) };
  }

  async update(id: string, userId: string, dto: UpdateVaccineDto) {
    this.logger.log({ msg: 'update vaccine', id, dto });
    const existing = await this.findOne(id, userId);

    const [updated] = await this.db
      .update(vaccines)
      .set({ ...dto, updatedAt: new Date() })
      .where(and(eq(vaccines.id, id), eq(vaccines.petId, existing.petId)))
      .returning();

    return { ...updated, status: this.computeStatus(updated) };
  }

  async remove(id: string, userId: string) {
    const existing = await this.findOne(id, userId);

    await this.db
      .update(vaccines)
      .set({ deletedAt: new Date(), updatedAt: new Date() })
      .where(and(eq(vaccines.id, id), eq(vaccines.petId, existing.petId)));

    return { message: 'Vacina removida com sucesso.' };
  }

  private computeStatus(vaccine: Vaccine): VaccineStatus {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (vaccine.dateTaken) {
      if (!vaccine.nextDose) return 'taken';
      const next = new Date(vaccine.nextDose);
      if (next < today) return 'overdue';
      const diffDays = Math.ceil(
        (next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
      );
      return diffDays <= 30 ? 'scheduled' : 'taken';
    }

    if (vaccine.scheduledDate) {
      const scheduled = new Date(vaccine.scheduledDate);
      return scheduled < today ? 'overdue' : 'scheduled';
    }

    return 'pending';
  }
}
