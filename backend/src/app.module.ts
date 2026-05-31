import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerModule } from 'nestjs-pino';
import { DrizzleModule } from './database/drizzle.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PetsModule } from './modules/pets/pets.module';
import { VaccinesModule } from './modules/vaccines/vaccines.module';
import { MedicationsModule } from './modules/medications/medications.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { RemindersModule } from './modules/reminders/reminders.module';
import { HealthHistoriesModule } from './modules/health-histories/health-histories.module';
import { PushModule } from './modules/push/push.module';
import { AdoptionsModule } from './modules/adoptions/adoptions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: process.env.NODE_ENV !== 'production'
          ? { target: 'pino-pretty', options: { colorize: true, translateTime: 'SYS:HH:MM:ss', ignore: 'pid,hostname' } }
          : undefined,
        level: process.env.LOG_LEVEL ?? 'info',
        autoLogging: true,
      },
    }),
    DrizzleModule,
    AuthModule,
    UsersModule,
    PetsModule,
    VaccinesModule,
    MedicationsModule,
    AppointmentsModule,
    RemindersModule,
    HealthHistoriesModule,
    PushModule,
    AdoptionsModule,
  ],
})
export class AppModule {}
