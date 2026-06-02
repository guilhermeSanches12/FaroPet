import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateVaccineDto {
  @IsUUID()
  petId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  manufacturer?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  recommendedAge?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  dose?: number;

  @IsOptional()
  @IsString()
  dateTaken?: string;

  @IsOptional()
  @IsString()
  scheduledDate?: string;

  @IsOptional()
  @IsString()
  nextDose?: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  batchNumber?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  clinic?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  vet?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateVaccineDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  manufacturer?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  recommendedAge?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  dose?: number;

  @IsOptional()
  @IsString()
  dateTaken?: string;

  @IsOptional()
  @IsString()
  scheduledDate?: string;

  @IsOptional()
  @IsString()
  nextDose?: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  batchNumber?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  clinic?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  vet?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
