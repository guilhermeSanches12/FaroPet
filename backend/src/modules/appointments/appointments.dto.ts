import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export enum AppointmentStatus {
  Scheduled = 'scheduled',
  Completed = 'completed',
  Canceled = 'canceled',
  Rescheduled = 'rescheduled',
}

export class CreateAppointmentDto {
  @IsUUID()
  petId: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  time: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  reason: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  location: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  vet?: string;

  @IsBoolean()
  hasMedication: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  medicationDetails?: string;

  @IsOptional()
  @IsString()
  observations?: string;

  @IsOptional()
  @IsString()
  diagnosis?: string;

  @IsOptional()
  @IsString()
  prescription?: string;

  @IsOptional()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus;
}

export class UpdateAppointmentDto {
  @IsOptional()
  @IsString()
  date?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  time?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  reason?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  location?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  vet?: string;

  @IsOptional()
  @IsBoolean()
  hasMedication?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  medicationDetails?: string;

  @IsOptional()
  @IsString()
  observations?: string;

  @IsOptional()
  @IsString()
  diagnosis?: string;

  @IsOptional()
  @IsString()
  prescription?: string;

  @IsOptional()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus;
}
