import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { and, eq, isNull } from 'drizzle-orm';
import { DRIZZLE } from '../../database/drizzle.token';
import { appointments, reminders } from '../../database/schema';
import { PetsService } from '../pets/pets.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from './appointments.dto';

type DrizzleDb = any;

@Injectable()
export class AppointmentsService {
  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDb,
    private readonly petsService: PetsService,
  ) {}

  private async upsertReminder(appointment: any) {
    if (appointment.status !== 'scheduled') return;

    // remindAt = 24h antes da consulta (Z força interpretação em UTC)
    const dateTime = new Date(`${appointment.date}T${appointment.time || '00:00'}:00Z`);
    const remindAt = new Date(dateTime.getTime() - 24 * 60 * 60 * 1000);

    // Verifica se já existe reminder para esta consulta
    const existing = await this.db.query.reminders.findFirst({
      where: and(
        eq(reminders.referenceId, appointment.id),
        eq(reminders.referenceTable, 'appointments'),
        isNull(reminders.deletedAt),
      ),
    });

    if (existing) {
      await this.db
        .update(reminders)
        .set({
          remindAt,
          title: `Consulta amanhã`,
          description: `${appointment.reason} — ${appointment.time}`,
          updatedAt: new Date(),
          pushSentAt: null, // reseta para reenviar push se data mudou
        })
        .where(eq(reminders.id, existing.id));
    } else {
      await this.db.insert(reminders).values({
        petId: appointment.petId,
        type: 'appointment',
        title: `Consulta amanhã`,
        description: `${appointment.reason} — ${appointment.time}`,
        remindAt,
        referenceId: appointment.id,
        referenceTable: 'appointments',
      });
    }
  }

  async findAllByPet(petId: string, userId: string) {
    await this.petsService.verifyOwnership(petId, userId);
    return this.db.query.appointments.findMany({
      where: and(eq(appointments.petId, petId), isNull(appointments.deletedAt)),
    });
  }

  async findOne(id: string, userId: string) {
    const appointment = await this.db.query.appointments.findFirst({
      where: and(eq(appointments.id, id), isNull(appointments.deletedAt)),
    });

    if (!appointment) throw new NotFoundException('Agendamento nao encontrado.');
    await this.petsService.verifyOwnership(appointment.petId, userId);

    return appointment;
  }

  async create(userId: string, dto: CreateAppointmentDto) {
    await this.petsService.verifyOwnership(dto.petId, userId);

    const [appointment] = await this.db
      .insert(appointments)
      .values(dto)
      .returning();

    await this.upsertReminder(appointment);
    return appointment;
  }

  async update(id: string, userId: string, dto: UpdateAppointmentDto) {
    const existing = await this.findOne(id, userId);

    const [updated] = await this.db
      .update(appointments)
      .set({ ...dto, updatedAt: new Date() })
      .where(and(eq(appointments.id, id), eq(appointments.petId, existing.petId)))
      .returning();

    await this.upsertReminder(updated);
    return updated;
  }

  async remove(id: string, userId: string) {
    const existing = await this.findOne(id, userId);

    await this.db
      .update(appointments)
      .set({ deletedAt: new Date(), updatedAt: new Date() })
      .where(and(eq(appointments.id, id), eq(appointments.petId, existing.petId)));

    return { message: 'Agendamento removido com sucesso.' };
  }
}
