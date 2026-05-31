# Faro Pet — Backend Guidelines

## Visão geral

Este documento define os padrões, convenções e decisões técnicas para a construção do backend do **Faro Pet**.

Leia este arquivo inteiro antes de criar qualquer arquivo. Siga estritamente as convenções aqui definidas.

---

## Stack

| Camada         | Tecnologia                          |
| -------------- | ----------------------------------- |
| Framework      | NestJS (TypeScript)                 |
| ORM            | Drizzle ORM                         |
| Banco de dados | PostgreSQL (local, sem Docker)      |
| Autenticação   | JWT (email + senha simples)         |
| Validação      | class-validator + class-transformer |
| Runtime        | Node.js                             |

---

## Estrutura de pastas

Organize **por domínio**. Cada módulo é autossuficiente.

```
src/
├── main.ts
├── app.module.ts
├── config/
│   └── app.config.ts
├── common/
│   ├── decorators/
│   │   └── current-user.decorator.ts
│   ├── filters/
│   │   └── all-exceptions.filter.ts
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   └── pipes/
├── database/
│   ├── drizzle.module.ts
│   ├── drizzle.token.ts
│   └── schema/
│       ├── index.ts           ← re-exporta tudo
│       ├── users.schema.ts
│       ├── pets.schema.ts
│       ├── vaccines.schema.ts
│       ├── medications.schema.ts
│       ├── appointments.schema.ts
│       └── reminders.schema.ts
└── modules/
    ├── auth/
    │   ├── auth.module.ts
    │   ├── auth.controller.ts
    │   ├── auth.service.ts
    │   ├── auth.dto.ts
    │   └── jwt.strategy.ts
    ├── users/
    ├── pets/
    ├── vaccines/
    ├── medications/
    ├── appointments/
    └── reminders/
```

Cada módulo contém: `module.ts`, `controller.ts`, `service.ts`, `dto.ts`.

---

## Banco de dados e Drizzle

### Conexão

- Use `postgres` (driver `postgres-js`) para conectar ao PostgreSQL.
- Instancie o Drizzle em um **módulo global** (`DrizzleModule`) usando um provider com token `Symbol('DRIZZLE')`.
- Injete o db via `@Inject(DRIZZLE)` nos services.

```ts
// database/drizzle.token.ts
export const DRIZZLE = Symbol("DRIZZLE");

// database/drizzle.module.ts
@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const client = postgres(config.getOrThrow("DATABASE_URL"), { max: 10 });
        return drizzle(client, { schema });
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
```

### Schemas

- Um arquivo por entidade em `src/database/schema/`.
- Sempre exporte os tipos inferidos: `type User = typeof users.$inferSelect` e `type NewUser = typeof users.$inferInsert`.
- Use `uuid().defaultRandom().primaryKey()` para IDs.
- Use `timestamp('created_at').defaultNow().notNull()` e `timestamp('updated_at').defaultNow().notNull()` em todas as tabelas.
- Use `pgEnum` para campos com valores fixos (status, tipo, espécie etc.).
- Chaves estrangeiras sempre com `references(() => tabela.id, { onDelete: 'cascade' })`.
- Re-exporte tudo em `src/database/schema/index.ts`.

### Migrations

- Gere com `drizzle-kit generate`.
- Aplique com `drizzle-kit migrate`.
- O arquivo `drizzle.config.ts` deve apontar para `src/database/schema/index.ts`.

### Queries

- Prefira `db.query.<tabela>.findFirst()` e `db.query.<tabela>.findMany()` para leituras simples.
- Use `eq`, `and`, `or` do `drizzle-orm` para filtros.
- Para insert/update/delete, use `.returning()` para retornar o registro afetado.
- **Não use LINQ-style query syntax** — use a API fluente do Drizzle.

---

## Autenticação

- JWT simples com email + senha. **Sem refresh token** nesta versão.
- Hash de senha com `bcryptjs`, salt rounds `10`.
- Token extraído via `Authorization: Bearer <token>`.
- Payload do JWT: `{ sub: userId, email }`.
- Expiração configurável via `JWT_EXPIRES_IN` no `.env` (padrão `7d`).

### Estrutura do Auth

```
auth/
├── auth.module.ts       ← importa PassportModule e JwtModule.registerAsync
├── auth.controller.ts   ← POST /auth/register, POST /auth/login
├── auth.service.ts      ← register(), login(), buildToken()
├── auth.dto.ts          ← RegisterDto, LoginDto
└── jwt.strategy.ts      ← PassportStrategy(Strategy), valida payload
```

### Guard

- `JwtAuthGuard` estende `AuthGuard('jwt')` — fica em `common/guards/`.
- Aplique por controller via `@UseGuards(JwtAuthGuard)`.
- **Não use guard global** — auth e register são públicos.

---

## Controllers

- Prefixo global da API: `api/v1` (configurado no `main.ts`).
- Use `@Controller('recurso')` sem o prefixo global.
- Rotas de listagem: `GET /recurso`
- Rotas de detalhe: `GET /recurso/:id`
- Criação: `POST /recurso`
- Atualização completa: `PUT /recurso/:id`
- Remoção: `DELETE /recurso/:id` com `@HttpCode(HttpStatus.OK)`
- Use `@Param('id', ParseUUIDPipe)` em todos os parâmetros UUID.
- Use `@CurrentUser()` para obter o usuário autenticado — nunca confie em IDs do body.

---

## Services

- Toda operação de leitura deve verificar se o recurso pertence ao `userId` autenticado.
- Lance `NotFoundException` quando o recurso não existir.
- Lance `ForbiddenException` quando o recurso pertencer a outro usuário.
- Lance `ConflictException` para duplicatas (ex: email já cadastrado).
- **Nunca retorne `passwordHash`** em nenhuma resposta.

---

## DTOs

- Um arquivo `<modulo>.dto.ts` por módulo com todos os DTOs.
- Use `class-validator` para validação.
- DTOs de criação: todos os campos obrigatórios sem `@IsOptional()`.
- DTOs de atualização: todos os campos com `@IsOptional()`.
- Use `@MaxLength()` em strings para evitar payloads gigantes.
- Não crie interfaces separadas para DTOs — use classes com decorators.

---

## Módulos de domínio

Implemente os seguintes módulos nesta ordem de prioridade:

### 1. Auth

Rotas públicas de registro e login. Detalhado acima.

### 2. Users

Perfil do tutor autenticado.

- `GET /users/me` — retorna dados do usuário logado (sem passwordHash).
- `PUT /users/me` — atualiza nome (email não pode ser alterado nesta versão).

### 3. Pets

CRUD completo. Todas as rotas protegidas por JWT.

- Filtrar sempre por `userId` do token.
- Campos: `name`, `species`, `breed`, `sex`, `birthDate`, `size`, `weight`, `photoUrl`, `notes`.

### 4. Vaccines

Vinculadas a um pet. Protegidas por JWT.

- Validar que o pet pertence ao usuário antes de qualquer operação.
- Campos: `name`, `category`, `appliedAt`, `nextDoseAt`, `periodicity`, `status`, `batch`, `attachmentUrl`, `notes`.
- O campo `status` deve ser calculado automaticamente no service com base nas datas:
  - `up_to_date`: `nextDoseAt` no futuro além da janela de alerta.
  - `due_soon`: `nextDoseAt` dentro de 30 dias.
  - `overdue`: `nextDoseAt` no passado.
  - `pending_validation`: sem `nextDoseAt` ou `appliedAt`.

### 5. Medications

Vinculadas a um pet. Protegidas por JWT.

- Campos: `name`, `dosage`, `frequency`, `startDate`, `endDate`, `status`, `prescribedBy`, `attachmentUrl`, `notes`.

### 6. Appointments

Agendamentos vinculados a um pet. Protegidas por JWT.

- Campos: `type`, `status`, `scheduledAt`, `clinic`, `veterinarian`, `notes`.

### 7. Reminders

Lembretes vinculados a um pet. Protegidas por JWT.

- Campos: `type`, `title`, `description`, `remindAt`, `isSent`, `isDismissed`.
- Rota extra: `PATCH /reminders/:id/dismiss` para marcar como dispensado.

---

## Variáveis de ambiente

O projeto usa `@nestjs/config` com `ConfigModule.forRoot({ isGlobal: true })`.

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://usuario:senha@localhost:5432/faro_pet
JWT_SECRET=segredo_forte_aqui
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

Use sempre `config.getOrThrow('CHAVE')` para variáveis obrigatórias — isso quebra a aplicação no boot se a variável estiver faltando, em vez de falhar silenciosamente em runtime.

---

## main.ts

Configure no bootstrap:

```ts
app.setGlobalPrefix("api/v1");

app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }),
);

app.useGlobalFilters(new AllExceptionsFilter());

app.enableCors({
  origin: process.env.FRONTEND_URL ?? "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
});
```

---

## Respostas da API

- Sucesso com dado: retorne o objeto diretamente (NestJS serializa para JSON).
- Sucesso sem dado (delete): retorne `{ message: 'Recurso removido com sucesso.' }`.
- Erros: tratados pelo `AllExceptionsFilter` global — não crie try/catch nos controllers.

---

## Convenções de nomenclatura

| Artefato                       | Convenção  | Exemplo                |
| ------------------------------ | ---------- | ---------------------- |
| Arquivos                       | kebab-case | `pets.service.ts`      |
| Classes                        | PascalCase | `PetsService`          |
| Métodos/variáveis              | camelCase  | `findAll`, `userId`    |
| Colunas no banco               | snake_case | `created_at`, `pet_id` |
| Propriedades no schema Drizzle | camelCase  | `createdAt`, `petId`   |
| Enums TypeScript               | PascalCase | `VaccineStatus`        |
| Enums no banco (pgEnum)        | snake_case | `vaccine_status`       |
| Rotas                          | kebab-case | `/api/v1/pet-owners`   |

---

## O que NÃO fazer

- ❌ Não use `TypeORM` — o ORM é Drizzle.
- ❌ Não use `@nestjs/typeorm` ou `@nestjs/mongoose`.
- ❌ Não use `any` como tipo — se necessário, use `unknown` e faça narrowing.
- ❌ Não retorne `passwordHash` em nenhuma resposta.
- ❌ Não confie em `userId` vindo do body/query — sempre pegue do token via `@CurrentUser()`.
- ❌ Não use guard global — rotas de auth são públicas.
- ❌ Não crie lógica de negócio nos controllers — tudo vai no service.
- ❌ Não instale `@nestjs/swagger` nesta versão — sem documentação automática por enquanto.
- ❌ Não use Docker — o banco PostgreSQL sobe localmente.

---

## Dependências esperadas

```json
{
  "dependencies": {
    "@nestjs/common": "^10",
    "@nestjs/core": "^10",
    "@nestjs/jwt": "^10",
    "@nestjs/passport": "^10",
    "@nestjs/platform-express": "^10",
    "@nestjs/config": "^3",
    "passport": "^0.7",
    "passport-jwt": "^4",
    "bcryptjs": "^2.4",
    "drizzle-orm": "^0.30",
    "postgres": "^3.4",
    "class-validator": "^0.14",
    "class-transformer": "^0.5",
    "reflect-metadata": "^0.2",
    "rxjs": "^7"
  },
  "devDependencies": {
    "@nestjs/cli": "^10",
    "@nestjs/schematics": "^10",
    "@types/bcryptjs": "^2.4",
    "@types/passport-jwt": "^4",
    "drizzle-kit": "^0.21",
    "typescript": "^5",
    "ts-node": "^10",
    "tsconfig-paths": "^4"
  }
}
```

---

## Checklist antes de considerar o backend pronto

- [ ] `npm run start:dev` sobe sem erros
- [ ] `POST /api/v1/auth/register` cria usuário e retorna token
- [ ] `POST /api/v1/auth/login` retorna token
- [ ] Rotas sem token retornam `401`
- [ ] `GET /api/v1/pets` retorna apenas pets do usuário autenticado
- [ ] Migrations geradas e aplicadas com sucesso
- [ ] Nenhum `passwordHash` vazando em resposta alguma
