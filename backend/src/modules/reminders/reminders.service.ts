import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { and, eq, isNull, inArray } from 'drizzle-orm';
import { DRIZZLE } from '../../database/drizzle.token';
import { reminders, pets } from '../../database/schema';
import { PetsService } from '../pets/pets.service';
import { CreateReminderDto, UpdateReminderDto } from './reminders.dto';

type DrizzleDb = any;

@Injectable()
export class RemindersService {
  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDb,
    private readonly petsService: PetsService,
  ) {}

  async findAllByPet(petId: string, userId: string) {
    await this.petsService.verifyOwnership(petId, userId);
    return this.db.query.reminders.findMany({
      where: and(
        eq(reminders.petId, petId),
        eq(reminders.isDismissed, false),
        isNull(reminders.deletedAt),
      ),
    });
  }

  async findOne(id: string, userId: string) {
    const reminder = await this.db.query.reminders.findFirst({
      where: and(eq(reminders.id, id), isNull(reminders.deletedAt)),
    });

    if (!reminder) throw new NotFoundException('Lembrete nao encontrado.');
    await this.petsService.verifyOwnership(reminder.petId, userId);

    return reminder;
  }

  async create(userId: string, dto: CreateReminderDto) {
    await this.petsService.verifyOwnership(dto.petId, userId);

    const [reminder] = await this.db
      .insert(reminders)
      .values(dto)
      .returning();

    return reminder;
  }

  async update(id: string, userId: string, dto: UpdateReminderDto) {
    const existing = await this.findOne(id, userId);

    const [updated] = await this.db
      .update(reminders)
      .set({ ...dto, updatedAt: new Date() })
      .where(and(eq(reminders.id, id), eq(reminders.petId, existing.petId)))
      .returning();

    return updated;
  }

  async remove(id: string, userId: string) {
    const existing = await this.findOne(id, userId);

    await this.db
      .update(reminders)
      .set({ deletedAt: new Date(), updatedAt: new Date() })
      .where(and(eq(reminders.id, id), eq(reminders.petId, existing.petId)));

    return { message: 'Lembrete removido com sucesso.' };
  }

  async dismiss(id: string, userId: string) {
    const existing = await this.findOne(id, userId);

    const [updated] = await this.db
      .update(reminders)
      .set({ isDismissed: true, updatedAt: new Date() })
      .where(and(eq(reminders.id, id), eq(reminders.petId, existing.petId)))
      .returning();

    return updated;
  }

  async markRead(id: string, userId: string) {
    const existing = await this.findOne(id, userId);

    const [updated] = await this.db
      .update(reminders)
      .set({ isRead: true, updatedAt: new Date() })
      .where(and(eq(reminders.id, id), eq(reminders.petId, existing.petId)))
      .returning();

    return updated;
  }

  async findAllByUser(userId: string) {
    // Busca todos os pets do usuário
    const userPets = await this.db.query.pets.findMany({
      where: and(eq(pets.userId, userId), isNull(pets.deletedAt)),
    });

    if (userPets.length === 0) return [];

    const petIds = userPets.map((p: any) => p.id);

    return this.db.query.reminders.findMany({
      where: and(
        inArray(reminders.petId, petIds),
        eq(reminders.isDismissed, false),
        isNull(reminders.deletedAt),
      ),
      orderBy: (r: any, { desc }: any) => [desc(r.remindAt)],
    });
  }
}
