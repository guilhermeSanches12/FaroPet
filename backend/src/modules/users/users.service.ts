import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from '../../database/drizzle.token';
import { users } from '../../database/schema';
import { UpdateUserDto } from './users.dto';

type DrizzleDb = any;

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDb) {}

  async findById(userId: string) {
    const user = await this.db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) throw new NotFoundException('Usuario nao encontrado.');

    const { passwordHash: _, ...safe } = user;
    return safe;
  }

  async update(userId: string, dto: UpdateUserDto) {
    const [updated] = await this.db
      .update(users)
      .set({ ...dto, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();

    if (!updated) throw new NotFoundException('Usuario nao encontrado.');

    const { passwordHash: _, ...safe } = updated;
    return safe;
  }
}
