import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export enum PetSpecies {
  Dog = 'dog',
  Cat = 'cat',
  Bird = 'bird',
  Fish = 'fish',
  Hamster = 'hamster',
  Rabbit = 'rabbit',
  Reptile = 'reptile',
  Other = 'other',
}

export enum PetGender {
  Male = 'male',
  Female = 'female',
  Unknown = 'unknown',
}

export class CreatePetDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsEnum(PetSpecies)
  type: PetSpecies;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  breed?: string;

  @IsEnum(PetGender)
  gender: PetGender;

  @IsOptional()
  @IsString()
  birthDate?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  weight?: number;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  color?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  microchipCode?: string;

  @IsOptional()
  @IsString()
  conditions?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  photo?: string;
}

export class UpdatePetDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsEnum(PetSpecies)
  type?: PetSpecies;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  breed?: string;

  @IsOptional()
  @IsEnum(PetGender)
  gender?: PetGender;

  @IsOptional()
  @IsString()
  birthDate?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  weight?: number;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  color?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  microchipCode?: string;

  @IsOptional()
  @IsString()
  conditions?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  photo?: string;
}
