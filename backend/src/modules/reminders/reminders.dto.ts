import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export enum ReminderType {
  Vaccine = 'vaccine',
  Appointment = 'appointment',
  Medication = 'medication',
  General = 'general',
}

export class CreateReminderDto {
  @IsUUID()
  petId: string;

  @IsEnum(ReminderType)
  type: ReminderType;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  remindAt: string;

  @IsOptional()
  @IsUUID()
  referenceId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  referenceTable?: string;
}

export class UpdateReminderDto {
  @IsOptional()
  @IsEnum(ReminderType)
  type?: ReminderType;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  remindAt?: string;
}
