import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcryptjs';
import { DRIZZLE } from '../../database/drizzle.token';
import { users, type User } from '../../database/schema';
import { RegisterDto, LoginDto } from './auth.dto';

type DrizzleDb = any;

@Injectable()
export class AuthService {
  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDb,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.db.query.users.findFirst({
      where: eq(users.email, dto.email),
    });

    if (existing) {
      throw new ConflictException('Email ja cadastrado.');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const [user] = await this.db
      .insert(users)
      .values({
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        passwordHash,
        phone: dto.phone,
        cpf: dto.cpf,
      })
      .returning();

    return { access_token: this.buildToken(user), user: this.sanitize(user) };
  }

  async login(dto: LoginDto) {
    const user = await this.db.query.users.findFirst({
      where: eq(users.email, dto.email),
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais invalidas.');
    }

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Credenciais invalidas.');
    }

    return { access_token: this.buildToken(user), user: this.sanitize(user) };
  }

  private buildToken(user: User) {
    return this.jwtService.sign({ sub: user.id, email: user.email });
  }

  sanitize(user: User) {
    const { passwordHash: _, ...safe } = user;
    return safe;
  }
}
