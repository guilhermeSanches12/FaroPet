import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum MedType {
  Pill = 'pill',
  Liquid = 'liquid',
  Injection = 'injection',
  Topical = 'topical',
  Other = 'other',
}

export enum DoseStatus {
  Taken = 'taken',
  Skipped = 'skipped',
  Pending = 'pending',
}

export class DoseRecordDto {
  @IsString()
  date: string;

  @IsString()
  time: string;

  @IsEnum(DoseStatus)
  status: DoseStatus;
}

export class CreateMedicationDto {
  @IsUUID()
  petId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  dosage?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  frequency: string;

  @IsInt()
  @Min(1)
  durationDays: number;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @IsBoolean()
  fasting: boolean;

  @IsEnum(MedType)
  type: MedType;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  reason: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  prescribedBy?: string;

  @IsOptional()
  @IsString()
  observations?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DoseRecordDto)
  doses?: DoseRecordDto[];
}

export class UpdateMedicationDto {
  @IsOptional()
  @IsString()
  @MaxLength(150)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  dosage?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  frequency?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  durationDays?: number;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;

  @IsOptional()
  @IsBoolean()
  fasting?: boolean;

  @IsOptional()
  @IsEnum(MedType)
  type?: MedType;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  reason?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  prescribedBy?: string;

  @IsOptional()
  @IsString()
  observations?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DoseRecordDto)
  doses?: DoseRecordDto[];
}
