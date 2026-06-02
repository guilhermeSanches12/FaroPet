import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAdoptionDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  animalName?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  animalType: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  breed?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  gender: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  age?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  size?: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsString()
  healthInfo?: string;

  @IsOptional()
  @IsString()
  vaccinationInfo?: string;

  @IsOptional()
  @IsString()
  requirements?: string;

  @IsOptional()
  @IsString()
  observations?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  city: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  state: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  contactName: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  contactPhone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  contactWhatsapp?: string;
}

export class UpdateAdoptionDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  animalName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  animalType?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  breed?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  gender?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  age?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  size?: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  healthInfo?: string;

  @IsOptional()
  @IsString()
  vaccinationInfo?: string;

  @IsOptional()
  @IsString()
  requirements?: string;

  @IsOptional()
  @IsString()
  observations?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2)
  state?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  contactName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  contactPhone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  contactWhatsapp?: string;
}

export class UpdateAdoptionStatusDto {
  @IsString()
  @IsIn(['available', 'in_process', 'adopted'])
  status: string;
}
