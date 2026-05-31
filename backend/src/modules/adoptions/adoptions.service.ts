import {
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { and, eq, ilike, isNull } from 'drizzle-orm';
import { DRIZZLE } from '../../database/drizzle.token';
import { adoptions } from '../../database/schema';
import { CreateAdoptionDto, UpdateAdoptionDto, UpdateAdoptionStatusDto } from './adoptions.dto';

type DrizzleDb = any;

@Injectable()
export class AdoptionsService {
  private readonly logger = new Logger(AdoptionsService.name);

  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDb) {}

  async findAll(filters: { animalType?: string; state?: string; city?: string }) {
    const conditions = [isNull(adoptions.deletedAt)];
    if (filters.animalType) conditions.push(eq(adoptions.animalType, filters.animalType));
    if (filters.state) conditions.push(eq(adoptions.state, filters.state.toUpperCase()));
    if (filters.city) conditions.push(ilike(adoptions.city, `%${filters.city}%`));

    return this.db.query.adoptions.findMany({
      where: and(...conditions),
      orderBy: (a: any, { desc }: any) => [desc(a.createdAt)],
    });
  }

  async findMine(userId: string) {
    return this.db.query.adoptions.findMany({
      where: and(eq(adoptions.userId, userId), isNull(adoptions.deletedAt)),
      orderBy: (a: any, { desc }: any) => [desc(a.createdAt)],
    });
  }

  async findOne(id: string) {
    const adoption = await this.db.query.adoptions.findFirst({
      where: and(eq(adoptions.id, id), isNull(adoptions.deletedAt)),
    });
    if (!adoption) throw new NotFoundException('Adoção não encontrada.');
    return adoption;
  }

  async create(userId: string, dto: CreateAdoptionDto) {
    this.logger.log({ msg: 'create adoption', userId });
    const [adoption] = await this.db
      .insert(adoptions)
      .values({ ...dto, userId })
      .returning();
    return adoption;
  }

  async update(id: string, userId: string, dto: UpdateAdoptionDto) {
    const existing = await this.findOne(id);
    if (existing.userId !== userId) throw new ForbiddenException('Sem permissão.');

    const [updated] = await this.db
      .update(adoptions)
      .set({ ...dto, updatedAt: new Date() })
      .where(eq(adoptions.id, id))
      .returning();
    return updated;
  }

  async updateStatus(id: string, userId: string, dto: UpdateAdoptionStatusDto) {
    const existing = await this.findOne(id);
    if (existing.userId !== userId) throw new ForbiddenException('Sem permissão.');

    const [updated] = await this.db
      .update(adoptions)
      .set({ status: dto.status, updatedAt: new Date() })
      .where(eq(adoptions.id, id))
      .returning();
    return updated;
  }

  async remove(id: string, userId: string) {
    const existing = await this.findOne(id);
    if (existing.userId !== userId) throw new ForbiddenException('Sem permissão.');

    await this.db
      .update(adoptions)
      .set({ deletedAt: new Date(), updatedAt: new Date() })
      .where(eq(adoptions.id, id));

    return { message: 'Post removido com sucesso.' };
  }
}
