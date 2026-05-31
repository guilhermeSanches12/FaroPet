import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateHealthHistoryPhotoDto {
  @IsString()
  @IsNotEmpty()
  photoUrl: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  caption?: string;

  @IsOptional()
  @IsDateString()
  takenAt?: string;
}

export class CreateHealthHistoryDto {
  @IsUUID()
  petId: string;

  @IsOptional()
  @IsDateString()
  recordedAt?: string;

  @IsOptional()
  @IsString()
  symptoms?: string;

  @IsOptional()
  @IsString()
  tutorNotes?: string;

  @IsOptional()
  @IsNumber()
  @Min(30)
  @Max(45)
  temperatureCelsius?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  weightAtRecord?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateHealthHistoryPhotoDto)
  photos?: CreateHealthHistoryPhotoDto[];
}

export class UpdateHealthHistoryDto {
  @IsOptional()
  @IsDateString()
  recordedAt?: string;

  @IsOptional()
  @IsString()
  symptoms?: string;

  @IsOptional()
  @IsString()
  tutorNotes?: string;

  @IsOptional()
  @IsNumber()
  @Min(30)
  @Max(45)
  temperatureCelsius?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  weightAtRecord?: number;
}

export class AddHealthHistoryPhotoDto {
  @IsString()
  @IsNotEmpty()
  photoUrl: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  caption?: string;

  @IsOptional()
  @IsDateString()
  takenAt?: string;
}
