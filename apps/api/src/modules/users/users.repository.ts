import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DATABASE } from '../../database/database.constants';
import type { DrizzleDb } from '../../database/database.types';
import { users } from '../../database/drizzle/schema';

@Injectable()
export class UsersRepository {
  constructor(@Inject(DATABASE) private readonly db: DrizzleDb) {}

  async findOrCreate(data: { id: string; email: string }) {
    const [user] = await this.db
      .insert(users)
      .values({
        id: data.id,
        email: data.email,
        name: data.email.split('@')[0],
        provider: 'email',
      })
      .onConflictDoUpdate({
        target: users.id,
        set: { email: data.email },
      })
      .returning();
    return user;
  }

  async update(id: string, data: { name?: string }) {
    const [user] = await this.db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    return user;
  }
}
