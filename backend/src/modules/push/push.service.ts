import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { and, eq, isNull, lte } from 'drizzle-orm';
import * as webPush from 'web-push';
import { DRIZZLE } from '../../database/drizzle.token';
import { pushSubscriptions, reminders, pets } from '../../database/schema';
import { SubscribePushDto } from './push.dto';

type DrizzleDb = any;

@Injectable()
export class PushService {
  private readonly logger = new Logger(PushService.name);

  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDb,
    private readonly config: ConfigService,
  ) {
    webPush.setVapidDetails(
      config.getOrThrow<string>('VAPID_SUBJECT'),
      config.getOrThrow<string>('VAPID_PUBLIC_KEY'),
      config.getOrThrow<string>('VAPID_PRIVATE_KEY'),
    );
  }

  async subscribe(userId: string, dto: SubscribePushDto) {
    // Desativa subscription anterior com mesmo endpoint
    await this.db
      .update(pushSubscriptions)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(pushSubscriptions.endpoint, dto.endpoint));

    const [sub] = await this.db
      .insert(pushSubscriptions)
      .values({
        userId,
        endpoint: dto.endpoint,
        p256dhKey: dto.keys.p256dh,
        authKey: dto.keys.auth,
        userAgent: dto.userAgent,
      })
      .returning();

    return sub;
  }

  async unsubscribe(userId: string, endpoint: string) {
    await this.db
      .update(pushSubscriptions)
      .set({ isActive: false, updatedAt: new Date() })
      .where(
        and(
          eq(pushSubscriptions.userId, userId),
          eq(pushSubscriptions.endpoint, endpoint),
        ),
      );
    return { message: 'Subscription desativada.' };
  }

  async sendTest(userId: string) {
    const subs = await this.db.query.pushSubscriptions.findMany({
      where: and(
        eq(pushSubscriptions.userId, userId),
        eq(pushSubscriptions.isActive, true),
      ),
    });

    if (subs.length === 0) {
      return { success: false, message: 'Nenhuma subscription ativa encontrada.' };
    }

    const payload = JSON.stringify({
      title: 'FaroPet',
      body: 'Notificações ativadas com sucesso!',
      url: '/notifications',
    });

    let sent = 0;
    for (const sub of subs) {
      try {
        await webPush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: { p256dh: sub.p256dhKey, auth: sub.authKey },
          },
          payload,
        );
        await this.db
          .update(pushSubscriptions)
          .set({ lastUsedAt: new Date() })
          .where(eq(pushSubscriptions.id, sub.id));
        sent++;
      } catch (err: any) {
        this.logger.warn(`Push falhou para sub ${sub.id}: ${err.message}`);
        if (err.statusCode === 410 || err.statusCode === 404) {
          await this.db
            .update(pushSubscriptions)
            .set({ isActive: false, updatedAt: new Date() })
            .where(eq(pushSubscriptions.id, sub.id));
        }
      }
    }

    return { success: sent > 0, message: `Push de teste enviado para ${sent} dispositivo(s).` };
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async cronProcessReminders() {
    const result = await this.processPendingReminders();
    if (result.processed > 0) {
      this.logger.log(`Cron: ${result.processed} reminder(s) processado(s), ${result.sent} push(es) enviado(s).`);
    }
  }

  async processPendingReminders() {
    const now = new Date();

    // Buscar reminders pendentes: remindAt <= agora, pushSentAt == null, nao deletado, nao dismissed
    const pending = await this.db.query.reminders.findMany({
      where: and(
        lte(reminders.remindAt, now),
        isNull(reminders.pushSentAt),
        eq(reminders.isDismissed, false),
        isNull(reminders.deletedAt),
      ),
    });

    if (pending.length === 0) {
      return { processed: 0, sent: 0 };
    }

    let totalSent = 0;

    for (const reminder of pending) {
      // Encontrar o dono do pet para buscar suas subscriptions
      const pet = await this.db.query.pets.findFirst({
        where: eq(pets.id, reminder.petId),
      });
      if (!pet) continue;

      const subs = await this.db.query.pushSubscriptions.findMany({
        where: and(
          eq(pushSubscriptions.userId, pet.userId),
          eq(pushSubscriptions.isActive, true),
        ),
      });

      // Payload seguro: sem dados sensíveis
      const payload = JSON.stringify({
        title: 'FaroPet',
        body: 'Você tem um lembrete próximo no FaroPet.',
        url: '/notifications',
      });

      let sentForReminder = false;
      for (const sub of subs) {
        try {
          await webPush.sendNotification(
            { endpoint: sub.endpoint, keys: { p256dh: sub.p256dhKey, auth: sub.authKey } },
            payload,
          );
          await this.db
            .update(pushSubscriptions)
            .set({ lastUsedAt: new Date() })
            .where(eq(pushSubscriptions.id, sub.id));
          sentForReminder = true;
        } catch (err: any) {
          this.logger.warn(`Push falhou para sub ${sub.id}: ${err.message}`);
          if (err.statusCode === 410 || err.statusCode === 404) {
            await this.db
              .update(pushSubscriptions)
              .set({ isActive: false, updatedAt: new Date() })
              .where(eq(pushSubscriptions.id, sub.id));
          }
        }
      }

      // Marcar como enviado independente de ter subscriptions ou não (evita reprocessar)
      await this.db
        .update(reminders)
        .set({ pushSentAt: now, isSent: true, updatedAt: new Date() })
        .where(eq(reminders.id, reminder.id));

      if (sentForReminder) totalSent++;
    }

    return { processed: pending.length, sent: totalSent };
  }

  getPublicKey() {
    return { publicKey: this.config.getOrThrow<string>('VAPID_PUBLIC_KEY') };
  }
}
