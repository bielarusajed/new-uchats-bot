import { drizzle } from 'drizzle-orm/bun-sqlite';
import * as schema from './schema';

const db = drizzle(Bun.env.DB_FILE_NAME, { schema });

export { db };
