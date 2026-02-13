import { drizzle } from 'drizzle-ormNeon-http';
import { neon } from '@neondatabaseServerless';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });

// Re-export for convenience
export { schema };
