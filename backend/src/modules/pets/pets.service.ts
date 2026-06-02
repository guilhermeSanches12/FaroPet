import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { and, eq, isNull } from 'drizzle-orm';
import { DRIZZLE } from '../../database/drizzle.token';
import { pets } from '../../database/schema';
import { CreatePetDto, UpdatePetDto } from './pets.dto';

type DrizzleDb = any;

@Injectable()
export class PetsService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDb) {}

  findAllByUser(userId: string) {
    return this.db.query.pets.findMany({
      where: and(eq(pets.userId, userId), isNull(pets.deletedAt)),
    });
  }

  async findOne(id: string, userId: string) {
    const pet = await this.db.query.pets.findFirst({
      where: and(eq(pets.id, id), isNull(pets.deletedAt)),
    });

    if (!pet) throw new NotFoundException('Pet nao encontrado.');
    if (pet.userId !== userId) throw new ForbiddenException();

    return this.toResponse(pet);
  }

  async create(userId: string, dto: CreatePetDto) {
    const { type, ...rest } = dto;
    const [pet] = await this.db
      .insert(pets)
      .values({ ...rest, species: type, userId })
      .returning();
    return this.toResponse(pet);
  }

  async update(id: string, userId: string, dto: UpdatePetDto) {
    await this.findOne(id, userId);

    const { type, ...rest } = dto;
    const updateData: Record<string, unknown> = { ...rest, updatedAt: new Date() };
    if (type !== undefined) updateData.species = type;

    const [updated] = await this.db
      .update(pets)
      .set(updateData)
      .where(and(eq(pets.id, id), eq(pets.userId, userId), isNull(pets.deletedAt)))
      .returning();

    return this.toResponse(updated);
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    await this.db
      .update(pets)
      .set({ deletedAt: new Date(), updatedAt: new Date() })
      .where(and(eq(pets.id, id), eq(pets.userId, userId)));

    return { message: 'Pet removido com sucesso.' };
  }

  async verifyOwnership(petId: string, userId: string) {
    const pet = await this.db.query.pets.findFirst({
      where: and(eq(pets.id, petId), isNull(pets.deletedAt)),
    });

    if (!pet) throw new NotFoundException('Pet nao encontrado.');
    if (pet.userId !== userId) throw new ForbiddenException();

    return pet;
  }

  private toResponse(pet: typeof pets.$inferSelect) {
    const { species, ...rest } = pet;
    return { ...rest, type: species };
  }
}
